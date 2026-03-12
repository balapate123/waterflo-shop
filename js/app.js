// Waterflo App Logic v4 — Multi-Brand
// Cart item shape:
// { cartKey, brandId, code, name, size, category, unitType, unitLabel, pcsPerUnit, ratePerUnit, qty }

// ─── HTML ESCAPING ──────────────────────────────────────────────────────────────

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ─── GLOBALS ────────────────────────────────────────────────────────────────────
var activeBrand = window.activeBrand || null;
var CATEGORIES = [];
var SUBCATEGORY_NAMES = {};
var userDiscount = 0; // percentage discount for logged-in user
var userData = null;   // current user data from /api/auth/me

// ─── LOAD CART — migrate / clear old format ─────────────────────────────────────
var cart = JSON.parse(localStorage.getItem('wf_cart') || '[]');
if (cart.length > 0 && cart[0].cartKey === undefined) {
  cart = [];
  localStorage.removeItem('wf_cart');
} else {
  var prevLen = cart.length;
  cart = cart.filter(function(x) { return !['single', 'pipe3m', 'pipe5m'].includes(x.unitType); });
  if (cart.length !== prevLen) localStorage.setItem('wf_cart', JSON.stringify(cart));
}

var activeCategory = 'all';
var activeSize     = '';
var activeSubcat   = '';
var searchQuery    = '';
var viewMode       = 'grid';

// ─── HELPERS ────────────────────────────────────────────────────────────────────

function fmt(amount) {
  if (amount == null || isNaN(amount)) return '\u2014';
  if (amount >= 100000) return '\u20B9' + (amount / 100000).toFixed(1) + 'L';
  if (amount >= 1000)   return '\u20B9' + amount.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  return '\u20B9' + amount.toFixed(2);
}

function fmtFull(amount) {
  if (amount == null || isNaN(amount)) return '\u2014';
  return '\u20B9' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ─── UNIT OPTIONS — generalized by brand unitLogic ──────────────────────────────

function getUnitOpts(p) {
  if (!p || p.comingSoon) return [];
  var logic = activeBrand ? activeBrand.unitLogic : 'cpvc';

  switch (logic) {
    case 'cpvc':
    case 'upvc-plumbing':
      return getUnitOptsCPVC(p);
    case 'swr':
      return getUnitOptsSWR(p);
    case 'agriculture':
      return getUnitOptsAgri(p);
    case 'boreline':
      return getUnitOptsBoreline(p);
    case 'ugd':
      return getUnitOptsUGD(p);
    default:
      return getUnitOptsCPVC(p);
  }
}

// CPVC / uPVC plumbing unit logic (original)
function getUnitOptsCPVC(p) {
  if (p.category === 'pipes') {
    var n = p.qty_bundle;
    if (p.subcategory === 'sch40' || p.subcategory === 'sch80') {
      var r3 = p.rate * 3;
      return [
        { type: 'bundle3m', label: 'Bundle \u00B7 ' + n + ' (3m)', pcs: n, rate: r3 * n },
      ];
    } else {
      return [
        { type: 'bundle3m', label: 'Bundle \u00B7 ' + n + ' (3m)',  pcs: n, rate: p.rate_3mtr * n },
        { type: 'bundle5m', label: 'Bundle \u00B7 ' + n + ' (5m)',  pcs: n, rate: p.rate_5mtr * n },
      ];
    }
  }
  // Fittings / accessories
  if (p.rate === 0) return [];
  var opts = [];
  if (p.std_pkg > 1)
    opts.push({ type: 'stdpkg', label: 'Pkg \u00B7 ' + p.std_pkg, pcs: p.std_pkg, rate: p.rate * p.std_pkg });
  if (p.qty_box > 1 && p.qty_box !== p.std_pkg)
    opts.push({ type: 'box', label: 'Box \u00B7 ' + p.qty_box.toLocaleString('en-IN'), pcs: p.qty_box, rate: p.rate * p.qty_box });
  return opts;
}

// SWR unit logic: pipes per piece, fittings per pkg/box
function getUnitOptsSWR(p) {
  if (p.category === 'pipes') {
    var len = p.pipe_length || 3;
    var label = '1 Pipe (' + len + 'm)';
    return [
      { type: 'piece', label: label, pcs: 1, rate: p.rate },
    ];
  }
  if (p.rate === 0) return [];
  var opts = [];
  if (p.std_pkg > 1)
    opts.push({ type: 'stdpkg', label: 'Pkg \u00B7 ' + p.std_pkg, pcs: p.std_pkg, rate: p.rate * p.std_pkg });
  if (p.qty_box > 1 && p.qty_box !== p.std_pkg)
    opts.push({ type: 'box', label: 'Box \u00B7 ' + p.qty_box, pcs: p.qty_box, rate: p.rate * p.qty_box });
  if (opts.length === 0)
    opts.push({ type: 'piece', label: '1 Pc', pcs: 1, rate: p.rate });
  return opts;
}

// Agriculture unit logic: pipes per 6m, fittings per pkg/box
function getUnitOptsAgri(p) {
  if (p.category === 'pipes') {
    var len = p.pipe_length || 6;
    return [
      { type: 'piece', label: '1 Pipe (' + len + 'm)', pcs: 1, rate: p.rate },
    ];
  }
  if (p.rate === 0) return [];
  var opts = [];
  if (p.std_pkg > 1)
    opts.push({ type: 'stdpkg', label: 'Pkg \u00B7 ' + p.std_pkg, pcs: p.std_pkg, rate: p.rate * p.std_pkg });
  if (p.qty_box > 1 && p.qty_box !== p.std_pkg)
    opts.push({ type: 'box', label: 'Box \u00B7 ' + p.qty_box, pcs: p.qty_box, rate: p.rate * p.qty_box });
  if (opts.length === 0)
    opts.push({ type: 'piece', label: '1 Pc', pcs: 1, rate: p.rate });
  return opts;
}

// Boreline unit logic: column pipes per piece
function getUnitOptsBoreline(p) {
  var len = p.pipe_length || 3;
  return [
    { type: 'piece', label: '1 Pipe (' + len + 'm)', pcs: 1, rate: p.rate },
  ];
}

// UGD unit logic: pipes per piece (3m or 6m)
function getUnitOptsUGD(p) {
  var len = p.pipe_length || 6;
  return [
    { type: 'piece', label: '1 Pipe (' + len + 'm)', pcs: 1, rate: p.rate },
  ];
}

// ─── PRODUCT CARD UNIT PICKER HTML ──────────────────────────────────────────────

function buildCardPicker(p) {
  if (p.comingSoon) return '<div class="picker-placeholder"><span class="coming-soon-badge">Coming Soon</span></div>';
  if (p.rate === 0)  return '<div class="picker-placeholder"><span class="tbd-price">Contact for Price</span></div>';

  var opts = getUnitOpts(p);
  if (!opts.length) return '';

  var isPipe = p.category === 'pipes';
  var html = '<div class="unit-picker' + (isPipe ? ' pipe-picker' : '') + '" id="upick_' + p.code + '">';
  for (var i = 0; i < opts.length; i++) {
    var o = opts[i];
    html += '<div class="unit-opt' + (i === 0 ? ' active' : '') + '"'
      + ' data-type="' + o.type + '" data-pcs="' + o.pcs + '"'
      + ' data-rate="' + o.rate.toFixed(2) + '" data-label="' + o.label + '"'
      + ' onclick="selectUnit(this)">'
      + '<span class="uopt-label">' + o.label + '</span>'
      + '<span class="uopt-price">' + fmt(o.rate) + '</span>'
      + '</div>';
  }
  html += '</div>';
  return html;
}

function selectUnit(el) {
  var picker = el.closest('.unit-picker');
  picker.querySelectorAll('.unit-opt').forEach(function(o) { o.classList.remove('active'); });
  el.classList.add('active');
}

// ─── CART UNIT PICKER HTML (mini version inside cart panel) ─────────────────────

function buildCartPicker(item) {
  var p = PRODUCTS.find(function(x) { return x.code === item.code; });
  var opts = p ? getUnitOpts(p) : [];
  if (opts.length <= 1) {
    return '<span class="ci-unit-tag">' + item.unitLabel + '</span>';
  }
  var html = '<div class="ci-unit-row">';
  for (var i = 0; i < opts.length; i++) {
    var o = opts[i];
    html += '<div class="mini-unit' + (item.unitType === o.type ? ' active' : '') + '"'
      + ' data-cartkey="' + item.cartKey + '"'
      + ' data-type="' + o.type + '" data-pcs="' + o.pcs + '"'
      + ' data-rate="' + o.rate.toFixed(2) + '" data-label="' + o.label + '"'
      + ' onclick="changeCartUnit(this)">'
      + o.label + ' \u00B7 ' + fmt(o.rate)
      + '</div>';
  }
  html += '</div>';
  return html;
}

// ─── CART CRUD ──────────────────────────────────────────────────────────────────

function saveCart() {
  localStorage.setItem('wf_cart', JSON.stringify(cart));
}

function cartLineCount()  { return cart.length; }
function cartUnitCount()  { return cart.reduce(function(s, i) { return s + i.qty; }, 0); }
function cartTotal()      { return cart.reduce(function(s, i) { return s + (i.ratePerUnit * i.qty); }, 0); }
function cartDiscountAmt(){ return userDiscount > 0 ? Math.round(cartTotal() * userDiscount / 100 * 100) / 100 : 0; }
function cartNetTotal()   { return cartTotal() - cartDiscountAmt(); }

function addToCart(code) {
  var p = PRODUCTS.find(function(x) { return x.code === code; });
  if (!p) return;

  var picker = document.getElementById('upick_' + code);
  var active  = picker ? picker.querySelector('.unit-opt.active') : null;

  var unitType    = active ? active.dataset.type             : 'single';
  var pcsPerUnit  = active ? parseInt(active.dataset.pcs)    : 1;
  var ratePerUnit = active ? parseFloat(active.dataset.rate) : p.rate;
  var unitLabel   = active ? active.dataset.label            : '1 pc';

  // Read qty from card input (default 1)
  var qtyInput = document.querySelector('[data-code="' + code + '"] .card-qty-input');
  var addQty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

  var brandId = activeBrand ? activeBrand.id : 'unknown';
  var cartKey  = brandId + '_' + code + '_' + unitType;
  var existing = cart.find(function(x) { return x.cartKey === cartKey; });
  if (existing) {
    existing.qty += addQty;
  } else {
    cart.push({
      cartKey: cartKey, brandId: brandId, code: p.code, name: p.name, size: p.size,
      category: p.category, unitType: unitType, unitLabel: unitLabel,
      pcsPerUnit: pcsPerUnit, ratePerUnit: ratePerUnit, qty: addQty
    });
  }
  saveCart();
  updateCartUI();
  showAddedFeedback(code);

  // Reset qty input
  if (qtyInput) qtyInput.value = 1;
}

function changeCartUnit(el) {
  var oldKey      = el.dataset.cartkey;
  var newType     = el.dataset.type;
  var pcsPerUnit  = parseInt(el.dataset.pcs);
  var ratePerUnit = parseFloat(el.dataset.rate);
  var unitLabel   = el.dataset.label;

  var item = cart.find(function(x) { return x.cartKey === oldKey; });
  if (!item || item.unitType === newType) return;

  var newKey      = item.brandId + '_' + item.code + '_' + newType;
  var existingNew = cart.find(function(x) { return x.cartKey === newKey; });

  if (existingNew) {
    existingNew.qty += item.qty;
    cart = cart.filter(function(x) { return x.cartKey !== oldKey; });
  } else {
    item.cartKey     = newKey;
    item.unitType    = newType;
    item.unitLabel   = unitLabel;
    item.pcsPerUnit  = pcsPerUnit;
    item.ratePerUnit = ratePerUnit;
  }
  saveCart();
  updateCartUI();
  renderCartItems();
}

function removeFromCart(cartKey) {
  cart = cart.filter(function(x) { return x.cartKey !== cartKey; });
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateQty(cartKey, delta) {
  var item = cart.find(function(x) { return x.cartKey === cartKey; });
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(function(x) { return x.cartKey !== cartKey; });
  saveCart();
  updateCartUI();
  renderCartItems();
}

function showAddedFeedback(code) {
  var btn = document.querySelector('[data-code="' + code + '"] .add-btn');
  if (!btn) return;
  btn.textContent = '\u2713 Added!';
  btn.classList.add('added');
  setTimeout(function() { btn.textContent = '+ Add to Cart'; btn.classList.remove('added'); }, 1400);
}

function updateCartUI() {
  var lines = cartLineCount();
  document.getElementById('cartBadge').textContent = lines;
  document.getElementById('cartBadge').style.display = lines > 0 ? 'flex' : 'none';

  var totalEl = document.getElementById('cartTotal');
  var countEl = document.getElementById('cartItemCount');

  if (userDiscount > 0 && lines > 0) {
    totalEl.innerHTML =
      '<span style="text-decoration:line-through;color:#999;font-size:0.85em">' + fmtFull(cartTotal()) + '</span> '
      + fmtFull(cartNetTotal());
    countEl.innerHTML =
      lines + ' item' + (lines !== 1 ? 's' : '')
      + ' &middot; <span style="color:#2e7d32">' + userDiscount + '% off</span>';
  } else {
    totalEl.textContent = fmtFull(cartTotal());
    countEl.textContent = lines + ' item' + (lines !== 1 ? 's' : '');
  }
}

function renderCartItems() {
  var container = document.getElementById('cartItems');
  if (cart.length === 0) {
    container.innerHTML =
      '<div class="cart-empty">'
      + '<div class="cart-empty-icon">\uD83D\uDED2</div>'
      + '<p>Your cart is empty</p>'
      + '<p class="cart-empty-sub">Select a product, choose unit size, then add to cart</p>'
      + '</div>';
    return;
  }

  // Group by brand
  var groups = {};
  cart.forEach(function(item) {
    var bid = item.brandId || 'unknown';
    if (!groups[bid]) groups[bid] = [];
    groups[bid].push(item);
  });

  var html = '';
  var brandIds = Object.keys(groups);

  brandIds.forEach(function(bid) {
    var brand = getBrandById(bid);
    var brandName = brand ? brand.shortName : bid;
    var brandColor = brand ? brand.color : '#455a64';

    // Show brand header if items from multiple brands
    if (brandIds.length > 1) {
      html += '<div class="cart-brand-header" style="border-left-color:' + brandColor + '">'
        + '<span class="cart-brand-dot" style="background:' + brandColor + '"></span>'
        + brandName
        + '</div>';
    }

    groups[bid].forEach(function(item) {
      var total    = item.pcsPerUnit * item.qty;
      var isPipe   = item.category === 'pipes';
      var pcsStr   = total.toLocaleString('en-IN') + (isPipe ? ' pipe' + (total !== 1 ? 's' : '') : ' pcs');
      var subtotal = item.ratePerUnit * item.qty;

      html += '<div class="cart-item">'
        + '<div class="ci-img cat-' + item.category + '">' + getCategoryIcon(item.code) + '</div>'
        + '<div class="ci-body">'
        +   '<div class="ci-row1">'
        +     '<div class="ci-name">' + escapeHtml(item.name) + '</div>'
        +     '<div class="qty-control">'
        +       '<button class="qty-btn" onclick="updateQty(\'' + item.cartKey + '\',-1)">\u2212</button>'
        +       '<span class="qty-val">' + item.qty + '</span>'
        +       '<button class="qty-btn" onclick="updateQty(\'' + item.cartKey + '\',1)">+</button>'
        +     '</div>'
        +   '</div>'
        +   '<div class="ci-row2">'
        +     '<span class="ci-code">' + escapeHtml(item.code) + ' \u00B7 ' + escapeHtml(item.size) + '</span>'
        +     '<span class="ci-subtotal">' + fmtFull(subtotal) + '</span>'
        +   '</div>'
        +   buildCartPicker(item)
        +   '<div class="ci-footer">'
        +     '<span class="ci-pcs">' + pcsStr + '</span>'
        +     '<button class="cart-remove" onclick="removeFromCart(\'' + item.cartKey + '\')">\uD83D\uDDD1\uFE0F</button>'
        +   '</div>'
        + '</div>'
        + '</div>';
    });
  });

  container.innerHTML = html;
}

// ─── FILTERING ──────────────────────────────────────────────────────────────────

function getFilteredProducts() {
  return PRODUCTS.filter(function(p) {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (activeSubcat && p.subcategory !== activeSubcat) return false;
    if (activeSize && p.size !== activeSize) return false;
    if (searchQuery) {
      var q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q)
          || p.code.toLowerCase().includes(q)
          || p.size.toLowerCase().includes(q)
          || (SUBCATEGORY_NAMES[p.subcategory] || '').toLowerCase().includes(q);
    }
    return true;
  });
}

function getAvailableSizes() {
  var sizes = [];
  var seen = {};
  PRODUCTS.filter(function(p) { return activeCategory === 'all' || p.category === activeCategory; })
    .forEach(function(p) {
      if (!seen[p.size]) { seen[p.size] = true; sizes.push(p.size); }
    });
  return sizes.sort(function(a, b) {
    var mmA = (PRODUCTS.find(function(p) { return p.size === a; }) || {}).size_mm || 999;
    var mmB = (PRODUCTS.find(function(p) { return p.size === b; }) || {}).size_mm || 999;
    return mmA !== mmB ? mmA - mmB : a.localeCompare(b);
  });
}

function getAvailableSubcats() {
  var subcats = [];
  var seen = {};
  PRODUCTS.filter(function(p) { return activeCategory !== 'all' ? p.category === activeCategory : true; })
    .forEach(function(p) {
      if (!seen[p.subcategory]) { seen[p.subcategory] = true; subcats.push(p.subcategory); }
    });
  return subcats;
}

// ─── RENDERING ──────────────────────────────────────────────────────────────────

function getCategoryIcon(code) {
  var p = PRODUCTS.find(function(x) { return x.code === code; });
  if (!p) return '\uD83D\uDCE6';
  var cat = CATEGORIES.find(function(c) { return c.id === p.category; });
  return (cat || {}).icon || '\uD83D\uDCE6';
}

function getProductIcon(p) {
  var icons = { pipes:'\uD83D\uDCCF', fittings:'\u2699\uFE0F', reducers:'\uD83D\uDD00', brass:'\uD83D\uDD29', valves:'\uD83D\uDEBF', mixer:'\uD83D\uDD27', accessories:'\uD83E\uDDF4', fabricated:'\uD83D\uDD29' };
  return icons[p.category] || '\uD83D\uDCE6';
}

function renderGridCard(p) {
  var inCart = cart.some(function(x) { return x.code === p.code; });
  var canAdd = !p.comingSoon;
  var isPipe = p.category === 'pipes';

  var pkgInfo = '';
  if (isPipe && (activeBrand.unitLogic === 'cpvc' || activeBrand.unitLogic === 'upvc-plumbing')) {
    var mtrRate = '<strong>\u20B9' + p.rate.toFixed(2) + '/mtr</strong>';
    if (p.rate_3mtr) {
      pkgInfo = '<div class="product-pkg">' + mtrRate + ' \u00B7 Bundle: ' + p.qty_bundle + ' pipes<br>3m: ' + fmt(p.rate_3mtr) + ' per pipe \u00B7 5m: ' + fmt(p.rate_5mtr) + ' per pipe</div>';
    } else {
      pkgInfo = '<div class="product-pkg">' + mtrRate + ' \u00B7 Bundle: ' + p.qty_bundle + ' pipes \u00B7 3m: ' + fmt(p.rate * 3) + ' per pipe</div>';
    }
  } else if (isPipe) {
    pkgInfo = '<div class="product-pkg"><strong>' + fmt(p.rate) + '</strong> per pipe</div>';
  } else if (p.std_pkg) {
    pkgInfo = '<div class="product-pkg">Std Pkg: ' + p.std_pkg + ' pcs'
      + (p.qty_box ? ' \u00B7 Box: ' + p.qty_box.toLocaleString('en-IN') + ' pcs' : '')
      + '</div>';
  }

  var imageContent = p.image_url
    ? '<img src="' + escapeHtml(p.image_url) + '" alt="' + escapeHtml(p.name) + '" class="product-img">'
    : '<span class="product-emoji">' + getProductIcon(p) + '</span>';

  return '<div class="product-card' + (inCart ? ' has-in-cart' : '') + '" data-code="' + p.code + '">'
    + '<div class="product-image cat-' + p.category + '">'
    +   imageContent
    +   (p.standard ? '<span class="std-badge">' + escapeHtml(p.standard.replace('ASTM ','')) + '</span>' : '')
    +   (inCart ? '<span class="in-cart-dot" title="In cart">\u25CF</span>' : '')
    + '</div>'
    + '<div class="product-body">'
    +   '<div class="product-type">' + escapeHtml(SUBCATEGORY_NAMES[p.subcategory] || p.subcategory) + '</div>'
    +   '<div class="product-name">' + escapeHtml(p.name) + '</div>'
    +   '<div class="product-meta">'
    +     '<span class="product-code">' + escapeHtml(p.code) + '</span>'
    +     '<span class="size-badge">' + escapeHtml(p.size) + '</span>'
    +   '</div>'
    +   pkgInfo
    + '</div>'
    + '<div class="product-picker-wrap">'
    +   buildCardPicker(p)
    + '</div>'
    + (canAdd
      ? '<div class="product-add-row">'
      +   '<div class="qty-inline">'
      +     '<button class="qi-btn" onclick="cardQtyDelta(\'' + p.code + '\',-1)">\u2212</button>'
      +     '<input type="number" class="card-qty-input" value="1" min="1" max="999">'
      +     '<button class="qi-btn" onclick="cardQtyDelta(\'' + p.code + '\',1)">+</button>'
      +   '</div>'
      +   '<button class="add-btn" onclick="addToCart(\'' + p.code + '\')">+ Add to Cart</button>'
      + '</div>'
      : '')
    + '</div>';
}

function renderListCard(p) {
  var inCart = cart.some(function(x) { return x.code === p.code; });
  var canAdd = !p.comingSoon;
  var isPipe = p.category === 'pipes';

  var pkgText = '';
  if (isPipe && (activeBrand.unitLogic === 'cpvc' || activeBrand.unitLogic === 'upvc-plumbing')) {
    pkgText = ' \u00B7 Bundle: ' + p.qty_bundle + ' pipes \u00B7 \u20B9' + p.rate.toFixed(2) + '/mtr';
  } else if (isPipe) {
    pkgText = ' \u00B7 ' + fmt(p.rate) + ' per pipe';
  } else if (p.std_pkg) {
    pkgText = ' \u00B7 Pkg: ' + p.std_pkg + (p.qty_box ? ' \u00B7 Box: ' + p.qty_box.toLocaleString('en-IN') : '');
  }

  var listImageContent = p.image_url
    ? '<img src="' + escapeHtml(p.image_url) + '" alt="' + escapeHtml(p.name) + '" class="pli-img">'
    : '<span class="pli-emoji">' + getProductIcon(p) + '</span>';

  return '<div class="pli' + (inCart ? ' has-in-cart' : '') + '" data-code="' + p.code + '">'
    + '<div class="pli-thumb cat-' + p.category + '">'
    +   listImageContent
    +   (p.standard ? '<small class="pli-std">' + escapeHtml(p.standard.replace('ASTM ','')) + '</small>' : '')
    + '</div>'
    + '<div class="pli-content">'
    +   '<div class="pli-top">'
    +     '<span class="product-type">' + escapeHtml(SUBCATEGORY_NAMES[p.subcategory] || p.subcategory) + '</span>'
    +     '<strong class="pli-name">' + escapeHtml(p.name) + '</strong>'
    +     '<span class="size-badge">' + escapeHtml(p.size) + '</span>'
    +     (inCart ? '<span class="in-cart-dot" title="In cart">\u25CF</span>' : '')
    +   '</div>'
    +   '<div class="pli-meta">'
    +     '<span class="product-code">' + escapeHtml(p.code) + '</span>' + pkgText
    +   '</div>'
    +   '<div class="pli-bottom">'
    +     buildCardPicker(p)
    +     (canAdd
        ? '<div class="qty-inline compact">'
        +   '<button class="qi-btn" onclick="cardQtyDelta(\'' + p.code + '\',-1)">\u2212</button>'
        +   '<input type="number" class="card-qty-input" value="1" min="1" max="999">'
        +   '<button class="qi-btn" onclick="cardQtyDelta(\'' + p.code + '\',1)">+</button>'
        + '</div>'
        + '<button class="add-btn pli-addbtn" onclick="addToCart(\'' + p.code + '\')">+ Add</button>'
        : '')
    +   '</div>'
    + '</div>'
    + '</div>';
}

function cardQtyDelta(code, delta) {
  var input = document.querySelector('[data-code="' + code + '"] .card-qty-input');
  if (!input) return;
  var val = parseInt(input.value) || 1;
  val = Math.max(1, val + delta);
  input.value = val;
}

function setView(mode) {
  viewMode = mode;
  document.getElementById('btnGridView').classList.toggle('active', mode === 'grid');
  document.getElementById('btnListView').classList.toggle('active', mode === 'list');
  renderProducts();
}

function renderProducts() {
  var products = getFilteredProducts();
  var grid     = document.getElementById('productGrid');
  document.getElementById('productCount').textContent =
    products.length + ' product' + (products.length !== 1 ? 's' : '');

  grid.className = viewMode === 'list' ? 'product-grid list-view' : 'product-grid';

  if (products.length === 0) {
    grid.innerHTML =
      '<div class="no-results">'
      + '<div style="font-size:3rem">\uD83D\uDD0D</div>'
      + '<p>No products found</p>'
      + '<p class="no-results-sub">Try adjusting your filters or search</p>'
      + '</div>';
    return;
  }

  grid.innerHTML = products.map(function(p) {
    return viewMode === 'list' ? renderListCard(p) : renderGridCard(p);
  }).join('');
}

function renderCategoryTabs() {
  document.getElementById('categoryTabs').innerHTML = CATEGORIES.map(function(c) {
    return '<button class="cat-tab ' + (activeCategory === c.id ? 'active' : '') + '"'
      + ' onclick="setCategory(\'' + c.id + '\')"'
      + ' style="' + (activeCategory === c.id ? 'background:' + c.color + ';border-color:' + c.color + ';color:white' : '') + '">'
      + c.icon + ' ' + c.label
      + '</button>';
  }).join('');
}

function renderFilters() {
  var sizeSelect = document.getElementById('sizeFilter');
  sizeSelect.innerHTML =
    '<option value="">All Sizes</option>' +
    getAvailableSizes().map(function(s) {
      return '<option value="' + s.replace(/"/g, '&quot;') + '"' + (activeSize===s?' selected':'') + '>' + s + '</option>';
    }).join('');

  var sub = document.getElementById('subcatFilter');
  var subcats = getAvailableSubcats();
  sub.style.display = subcats.length > 0 ? '' : 'none';
  sub.innerHTML = '<option value="">All Types</option>' +
    subcats.map(function(s) {
      return '<option value="' + s + '"' + (activeSubcat===s?' selected':'') + '>' + (SUBCATEGORY_NAMES[s]||s) + '</option>';
    }).join('');
}

// ─── EVENTS ─────────────────────────────────────────────────────────────────────

function setCategory(cat) {
  activeCategory = cat; activeSubcat = ''; activeSize = '';
  renderCategoryTabs(); renderFilters(); renderProducts();
  document.getElementById('productGrid').scrollIntoView({ behavior:'smooth', block:'start' });
}

function openCart() {
  renderCartItems();
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

function clearCart() {
  if (!cart.length) return;
  if (confirm('Clear all items from cart?')) {
    cart = []; saveCart(); updateCartUI(); renderCartItems();
  }
}

// ─── QUOTE ──────────────────────────────────────────────────────────────────────

function openQuote() {
  if (!cart.length) { alert('Your cart is empty!'); return; }

  var dateStr  = new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
  var quoteNo  = 'WF-' + Date.now().toString().slice(-6);
  var hasTbd   = cart.some(function(x) { return !x.ratePerUnit; });
  var brandName = activeBrand ? activeBrand.name : 'Waterflo';
  var priceDate = activeBrand ? activeBrand.priceDate : '';

  // Calculate discount
  var discPct = userDiscount || 0;

  var grossTotal = 0;
  var rows = cart.map(function(item, i) {
    var rate = item.ratePerUnit;
    var lineTotal = rate * item.qty;
    grossTotal += lineTotal;
    var totalPcs = item.pcsPerUnit * item.qty;
    var isPipe   = item.category === 'pipes';
    return '<tr>'
      + '<td>' + (i+1) + '</td>'
      + '<td class="q-code">' + escapeHtml(item.code) + '</td>'
      + '<td>' + escapeHtml(item.name) + '</td>'
      + '<td>' + escapeHtml(item.size) + '</td>'
      + '<td>' + escapeHtml(item.unitLabel) + '</td>'
      + '<td class="tr">' + fmtFull(rate) + '</td>'
      + '<td class="tr">' + item.qty + '</td>'
      + '<td class="tr">' + totalPcs.toLocaleString('en-IN') + ' ' + (isPipe ? 'pipes' : 'pcs') + '</td>'
      + '<td class="tr"><strong>' + fmtFull(lineTotal) + '</strong></td>'
      + '</tr>';
  }).join('');

  var discAmt = discPct > 0 ? Math.round(grossTotal * discPct / 100 * 100) / 100 : 0;
  var netTotal = grossTotal - discAmt;

  // Discount info line
  var discountInfo = '';
  if (discPct > 0) {
    discountInfo = '<tr class="discount-row"><td colspan="8" class="tr" style="color:#2e7d32;font-weight:600">Discount Applied: ' + discPct + '%'
      + ' (You save: ' + fmtFull(discAmt) + ')</td>'
      + '<td class="tr" style="color:#2e7d32;font-weight:600">&minus;' + fmtFull(discAmt) + '</td></tr>';
  }

  // Dealer info
  var dealerInfo = '';
  if (userData) {
    dealerInfo = '<div class="quote-dealer">'
      + '<div><strong>Dealer:</strong> ' + escapeHtml(userData.company_name) + '</div>'
      + '<div>' + escapeHtml(userData.contact_name) + ' &bull; ' + escapeHtml(userData.phone) + '</div>'
      + '</div>';
  }

  document.getElementById('quoteContent').innerHTML =
    '<div class="quote-header">'
    + '<div class="quote-logo">'
    +   '<div class="quote-brand">Waterflo\u00AE \u2014 ' + brandName + '</div>'
    +   '<div class="quote-tagline">Pipes &amp; Fittings \u2014 Always Ahead in Quality</div>'
    +   '<div class="quote-contact">www.waterflo.in' + (priceDate ? ' \u00B7 w.e.f. ' + priceDate : '') + '</div>'
    + '</div>'
    + '<div class="quote-meta">'
    +   '<div><strong>Quote No:</strong> ' + quoteNo + '</div>'
    +   '<div><strong>Date:</strong> ' + dateStr + '</div>'
    +   '<div><strong>Valid:</strong> 7 days</div>'
    +   (discPct > 0 ? '<div style="color:#2e7d32;font-weight:700">Discount: ' + discPct + '%</div>' : '')
    + '</div>'
    + '</div>'
    + dealerInfo
    + '<div class="quote-scroll">'
    + '<table class="quote-table">'
    +   '<thead><tr><th>#</th><th>Code</th><th>Product</th><th>Size</th><th>Unit</th>'
    +   '<th>Rate/Unit</th><th>Units</th><th>Qty (total)</th><th>Amount</th></tr></thead>'
    +   '<tbody>' + rows + '</tbody>'
    +   '<tfoot>'
    +   (discPct > 0
      ? '<tr><td colspan="8" class="tr">Subtotal (before discount)</td><td class="tr">' + fmtFull(grossTotal) + '</td></tr>'
        + discountInfo
      : '')
    +   '<tr class="total-row">'
    +     '<td colspan="8" class="tr"><strong>Estimated Total (excl. GST)</strong></td>'
    +     '<td class="tr"><strong>' + fmtFull(netTotal) + '</strong></td>'
    +   '</tr>'
    +   (hasTbd ? '<tr><td colspan="9" class="quote-note">* Items with "\u2014" are contact-for-price and excluded from total</td></tr>' : '')
    +   '</tfoot>'
    + '</table>'
    + '</div>'
    + '<div class="quote-footer-note">'
    +   '<p>\u2022 All rates are per selected unit, exclusive of GST</p>'
    +   (discPct > 0 ? '<p>\u2022 Discount of ' + discPct + '% applied on total</p>' : '')
    +   '<p>\u2022 Prices subject to change without prior notice \u00B7 Subject to availability</p>'
    +   '<p>\u2022 Standard terms &amp; conditions apply</p>'
    + '</div>';

  document.getElementById('quoteModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuote() {
  document.getElementById('quoteModal').classList.remove('open');
  document.body.style.overflow = '';
}

function printQuote() { window.print(); }

// ─── ORDER ──────────────────────────────────────────────────────────────────────

function openOrder() {
  if (!cart.length) { alert('Your cart is empty!'); return; }
  var modalBody = document.querySelector('#orderModal .modal-body');
  modalBody.innerHTML = getOrderFormHTML();
  document.getElementById('orderForm').addEventListener('submit', submitOrder);
  document.getElementById('orderModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrder() {
  document.getElementById('orderModal').classList.remove('open');
  document.body.style.overflow = '';
}

function getOrderFormHTML() {
  var discPct = userDiscount || 0;

  var lines = cart.map(function(i) {
    var n      = i.pcsPerUnit * i.qty;
    var isPipe = i.category === 'pipes';
    var rate   = i.ratePerUnit;
    return '<div class="order-item-preview">'
      + '<span class="oip-code">' + escapeHtml(i.code) + '</span>'
      + '<span class="oip-name">' + escapeHtml(i.name) + ' ' + escapeHtml(i.size) + '</span>'
      + '<span class="oip-unit">' + escapeHtml(i.unitLabel) + ' \u00D7 ' + i.qty + '</span>'
      + '<span class="oip-total">' + n.toLocaleString('en-IN') + ' ' + (isPipe?'pipes':'pcs') + ' \u00B7 ' + fmtFull(rate*i.qty) + '</span>'
      + '</div>';
  }).join('');

  var subtotal = cartTotal();
  var discAmt = cartDiscountAmt();
  var netTotal = cartNetTotal();

  var discountNote = '';
  if (discPct > 0) {
    discountNote = '<div style="text-align:right;font-size:0.82rem;margin-top:8px;padding-top:8px;border-top:1px solid #e0e0e0">'
      + '<div>Subtotal: ' + fmtFull(subtotal) + '</div>'
      + '<div style="color:#2e7d32;font-weight:600">Discount (' + discPct + '%): &minus;' + fmtFull(discAmt) + '</div>'
      + '<div style="font-weight:700;font-size:0.9rem;margin-top:4px">Net Total: ' + fmtFull(netTotal) + '</div>'
      + '</div>';
  }

  return '<div class="order-cart-preview">'
    + '<div class="ocp-header">'
    +   '<strong>' + cartLineCount() + ' item' + (cartLineCount()!==1?'s':'') + '</strong>'
    +   '<span>Est. Total: <strong>' + fmtFull(netTotal) + '</strong> + GST</span>'
    + '</div>'
    + lines
    + discountNote
    + '</div>'
    + '<form id="orderForm">'
    +   '<div class="form-group"><label>Notes (optional)</label>'
    +     '<textarea name="notes" placeholder="Delivery time, special instructions, etc." rows="2"></textarea></div>'
    +   '<button type="submit" class="btn-submit-order">\uD83D\uDED2 Place Order</button>'
    + '</form>';
}

function submitOrder(e) {
  e.preventDefault();
  var formData = Object.fromEntries(new FormData(e.target));
  var submitBtn = e.target.querySelector('.btn-submit-order');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Placing order...';

  var brandId = activeBrand ? activeBrand.id : 'unknown';
  var items = cart.map(function(i) {
    return {
      code: i.code,
      name: i.name,
      size: i.size,
      unit_type: i.unitType,
      unit_label: i.unitLabel,
      pcs_per_unit: i.pcsPerUnit,
      rate_per_unit: i.ratePerUnit,
      qty: i.qty
    };
  });

  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ brand_id: brandId, items: items, notes: formData.notes || '', discount_percent: userDiscount || 0 })
  })
  .then(function(res) { return res.json().then(function(json) { return { ok: res.ok, json: json }; }); })
  .then(function(result) {
    if (!result.ok) {
      alert(result.json.error || 'Failed to place order');
      submitBtn.disabled = false;
      submitBtn.textContent = '\uD83D\uDED2 Place Order';
      return;
    }

    var order = result.json.order;
    var summaryLines = cart.map(function(i) {
      var n = (i.pcsPerUnit * i.qty).toLocaleString('en-IN');
      var isPipe = i.category === 'pipes';
      return escapeHtml(i.code) + ' \u2013 ' + escapeHtml(i.name) + ' ' + escapeHtml(i.size) + ' | ' + escapeHtml(i.unitLabel) + ' \u00D7 ' + i.qty + ' = ' + n + ' ' + (isPipe?'pipes':'pcs') + ' | ' + fmtFull(i.ratePerUnit*i.qty);
    }).join('<br>');

    e.target.closest('.modal-body').innerHTML =
      '<div class="order-success">'
      + '<div class="success-icon">\u2705</div>'
      + '<h3>Order Placed!</h3>'
      + '<p>Order No: <strong>' + order.order_no + '</strong></p>'
      + '<p>Status: <strong>Pending</strong></p>'
      + '<p>Our team will review and confirm your order.</p>'
      + '<div class="order-summary-box">'
      +   '<strong>Order Summary</strong><br><br>'
      +   summaryLines
      +   (order.total_amount > 0
            ? '<br><br>Subtotal: ' + fmtFull(order.total_amount)
              + (order.discount_percent > 0 ? '<br>Discount: ' + order.discount_percent + '% (&minus;' + fmtFull(order.total_amount - order.net_amount) + ')' : '')
              + '<br><strong>Net Total: ' + fmtFull(order.net_amount || order.total_amount) + ' + GST</strong>'
            : '')
      + '</div>'
      + '<button class="btn-primary" onclick="closeOrderSuccess()">Done</button>'
      + '</div>';

    cart = []; saveCart(); updateCartUI();
  })
  .catch(function() {
    alert('Network error. Please try again.');
    submitBtn.disabled = false;
    submitBtn.textContent = '\uD83D\uDED2 Place Order';
  });
}

function closeOrderSuccess() {
  closeOrder(); closeCart(); renderProducts();
}

// ─── LOGOUT ──────────────────────────────────────────────────────────────────────

function handleLogout() {
  localStorage.removeItem('wf_cart');
  fetch('/api/auth/logout', { method: 'POST' })
    .then(function() { window.location.href = '/login.html'; })
    .catch(function() { window.location.href = '/login.html'; });
}

// ─── BRAND THEMING ──────────────────────────────────────────────────────────────

function applyBrandTheme() {
  if (!activeBrand) return;

  // Hero
  var hero = document.getElementById('brandHero');
  if (hero) hero.style.background = activeBrand.heroGradient;

  // Hero text
  var heroTitle = document.getElementById('heroTitle');
  var heroSub = document.getElementById('heroSub');
  if (heroTitle) heroTitle.textContent = activeBrand.name;
  if (heroSub) heroSub.textContent = activeBrand.tagline + ' \u2022 w.e.f. ' + activeBrand.priceDate;

  // Data attribute for CSS theming
  document.body.setAttribute('data-brand', activeBrand.id);
}

// ─── INIT ───────────────────────────────────────────────────────────────────────

function init() {
  // Set brand data
  activeBrand = window.activeBrand || BRANDS[0];
  CATEGORIES = activeBrand.categories || [];
  SUBCATEGORY_NAMES = activeBrand.subcategoryNames || {};

  // Apply brand theme
  applyBrandTheme();

  // Fetch user data (discount, name) — non-blocking
  fetch('/api/auth/me').then(function(res) {
    if (res.ok) return res.json();
    return null;
  }).then(function(data) {
    if (data && data.user) {
      userData = data.user;
      userDiscount = data.user.discount_percent || 0;
    }
  }).catch(function() {});

  // Event listeners
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);
  document.getElementById('btnQuote').addEventListener('click', openQuote);
  document.getElementById('btnOrder').addEventListener('click', openOrder);
  document.getElementById('closeQuote').addEventListener('click', closeQuote);
  document.getElementById('btnPrint').addEventListener('click', printQuote);
  document.getElementById('closeOrder').addEventListener('click', closeOrder);

  document.getElementById('sizeFilter').addEventListener('change', function(e) { activeSize = e.target.value; renderProducts(); });
  document.getElementById('subcatFilter').addEventListener('change', function(e) { activeSubcat = e.target.value; renderProducts(); });
  document.getElementById('searchInput').addEventListener('input', function(e) { searchQuery = e.target.value.trim(); renderProducts(); });
  document.getElementById('clearSearch').addEventListener('click', function() { searchQuery = ''; document.getElementById('searchInput').value = ''; renderProducts(); });

  renderCategoryTabs();
  renderFilters();
  renderProducts();
  updateCartUI();

  // Fetch product images from API and merge into PRODUCTS
  var brandId = activeBrand ? activeBrand.id : '';
  if (brandId) {
    fetch('/api/brands/' + brandId + '/products')
      .then(function(res) { return res.ok ? res.json() : null; })
      .then(function(data) {
        if (!data || !data.products) return;
        var imageMap = {};
        data.products.forEach(function(p) {
          if (p.image_url) imageMap[p.code] = p.image_url;
        });
        if (Object.keys(imageMap).length === 0) return;
        PRODUCTS.forEach(function(p) {
          if (imageMap[p.code]) p.image_url = imageMap[p.code];
        });
        renderProducts();
      })
      .catch(function() {});
  }
}

// Wait for brand data to be ready
document.addEventListener('brand-data-ready', init);
