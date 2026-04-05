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
var userDiscount = 0;           // legacy flat % — kept for fallback
var userData = null;            // current user data from /api/auth/me
var userCategoryDiscounts = {}; // { 'CPVC Pipes': 59.90, ... } from /api/auth/me
var linkedDealers = window.linkedDealers || [];
var taxSettings = { gst_percent: 18, other_charges: [] };

// ─── TRADE CATEGORY MAPPING ─────────────────────────────────────────────────────
// Maps (brandId + product category + subcategory) → trade discount category name
// These 17 names match exactly what is stored in user_category_discounts table.
function getProductTradeCategory(item) {
  var brandId  = (item.brandId || '').toLowerCase();
  var cat      = (item.category || '').toLowerCase();
  var sub      = (item.subcategory || '').toLowerCase();
  var nameLower = (item.name || '').toLowerCase();

  // ── StrongFit CPVC (cpvc brand) ──
  if (brandId === 'strongfit-cpvc') {
    if (cat === 'pipes')                                      return 'CPVC Pipes';
    if (cat === 'valves')                                     return 'uPVC Ball Valves';
    if (cat === 'brass' || sub.indexOf('brass') >= 0)         return 'CPVC Brass Fittings';
    if (cat === 'accessories' && sub === 'solventcement')     return 'CPVC / uPVC Solvent';
    return 'CPVC Fittings'; // fittings, reducers, mixer
  }

  // ── SureFit uPVC Plumbing ──
  if (brandId === 'surefit-upvc') {
    if (cat === 'pipes')                                      return 'uPVC Pipes';
    if (cat === 'valves' || sub.indexOf('ball') >= 0)         return 'uPVC Ball Valves';
    if (cat === 'brass' || sub.indexOf('brass') >= 0)         return 'uPVC Brass Fittings';
    if (cat === 'accessories' && sub === 'solventcement')     return 'CPVC / uPVC Solvent';
    return 'uPVC Fittings';
  }

  // ── SWR brands (ClickFit, uPVC SWR, SelFit) ──
  if (brandId === 'clickfit-swr' || brandId === 'upvc-swr' || brandId === 'selfit') {
    if (cat === 'pipes')                                      return 'SWR Pipes';
    if (cat === 'accessories' && sub === 'solventcement')     return 'PVC / SWR Solvent';
    return 'SWR Fittings';
  }

  // ── UGD Underground Drainage ──
  if (brandId === 'ugd') {
    return 'UGD Pipes';
  }

  // ── AgriMaster Agriculture PVC ──
  if (brandId === 'agrimaster') {
    if (sub === 'column_pipe')                                return 'Column Pipes';
    if (cat === 'pipes')                                      return 'PVC Pipes';
    if (cat === 'valves' || sub === 'valve')                  return 'PVC Ball Valves';
    if (cat === 'brass' || sub.indexOf('brass') >= 0)         return 'PVC Brass Fittings';
    if (cat === 'accessories' && sub === 'solventcement')     return 'PVC / SWR Solvent';
    return 'PVC Fittings';
  }

  // ── Boreline Column Pipes ──
  if (brandId === 'boreline') {
    return 'Column Pipes';
  }

  // ── Fallback: guess from product name ──
  if (nameLower.indexOf('cpvc') >= 0 && cat === 'pipes')    return 'CPVC Pipes';
  if (nameLower.indexOf('cpvc') >= 0 && cat === 'brass')    return 'CPVC Brass Fittings';
  if (nameLower.indexOf('cpvc') >= 0)                       return 'CPVC Fittings';
  if (nameLower.indexOf('upvc') >= 0 && cat === 'pipes')    return 'uPVC Pipes';
  if (nameLower.indexOf('upvc') >= 0 && cat === 'brass')    return 'uPVC Brass Fittings';
  if (nameLower.indexOf('upvc') >= 0)                       return 'uPVC Fittings';
  if (nameLower.indexOf('swr')  >= 0 && cat === 'pipes')    return 'SWR Pipes';
  if (nameLower.indexOf('swr')  >= 0)                       return 'SWR Fittings';
  if (nameLower.indexOf('ugd')  >= 0)                       return 'UGD Pipes';
  if (nameLower.indexOf('pvc')  >= 0 && cat === 'pipes')    return 'PVC Pipes';
  if (nameLower.indexOf('column') >= 0)                     return 'Column Pipes';
  if (nameLower.indexOf('solvent') >= 0 || sub === 'solventcement') {
    return (nameLower.indexOf('swr') >= 0) ? 'PVC / SWR Solvent' : 'CPVC / uPVC Solvent';
  }
  // Default: CPVC Fittings (most common brand)
  return 'CPVC Fittings';
}

// Get the discount % that applies to a specific cart item
function getItemDiscount(item) {
  // Category discounts take priority over flat discount
  if (Object.keys(userCategoryDiscounts).length > 0) {
    var tradeCategory = getProductTradeCategory(item);
    if (userCategoryDiscounts[tradeCategory] !== undefined) {
      return userCategoryDiscounts[tradeCategory];
    }
  }
  // Fallback to legacy flat discount
  return userDiscount || 0;
}

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
function cartDiscountAmt(){
  // Per-item discount: each item gets its own category-specific discount
  if (Object.keys(userCategoryDiscounts).length > 0) {
    return cart.reduce(function(s, item) {
      var pct = getItemDiscount(item);
      var lineTotal = item.ratePerUnit * item.qty;
      var disc = pct > 0 ? Math.round(lineTotal * pct / 100 * 100) / 100 : 0;
      return s + disc;
    }, 0);
  }
  // Legacy flat discount
  return userDiscount > 0 ? Math.round(cartTotal() * userDiscount / 100 * 100) / 100 : 0;
}
function cartNetTotal()   { return cartTotal() - cartDiscountAmt(); }

function cartGstAmt() {
  var gst = taxSettings.gst_percent || 0;
  return gst > 0 ? Math.round(cartNetTotal() * gst / 100 * 100) / 100 : 0;
}

function cartOtherChargesAmt() {
  var net = cartNetTotal();
  var total = 0;
  (taxSettings.other_charges || []).forEach(function(ch) {
    if (ch.type === 'percent') {
      total += Math.round(net * ch.value / 100 * 100) / 100;
    } else {
      total += ch.value || 0;
    }
  });
  return total;
}

function cartGrandTotal() {
  return cartNetTotal() + cartGstAmt() + cartOtherChargesAmt();
}

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

  var hasDiscount = cartDiscountAmt() > 0;
  var gstAmt = cartGstAmt();
  var grandTotal = cartGrandTotal();

  if (lines > 0) {
    // Show grand total (incl. GST)
    if (hasDiscount) {
      totalEl.innerHTML =
        '<span style="text-decoration:line-through;color:#999;font-size:0.85em">' + fmtFull(cartTotal()) + '</span> '
        + fmtFull(grandTotal);
    } else {
      totalEl.textContent = fmtFull(grandTotal);
    }
    var parts = [];
    parts.push(lines + ' item' + (lines !== 1 ? 's' : ''));
    if (hasDiscount) {
      var discLabel = Object.keys(userCategoryDiscounts).length > 0
        ? 'discounts applied'
        : userDiscount + '% off';
      parts.push('<span style="color:#2e7d32">' + discLabel + '</span>');
    }
    if (gstAmt > 0) {
      parts.push('<span style="color:#666">incl. ' + taxSettings.gst_percent + '% GST</span>');
    }
    countEl.innerHTML = parts.join(' &middot; ');
  } else {
    totalEl.textContent = fmtFull(0);
    countEl.textContent = '0 items';
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
      + '</div>'
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

  var hasCategoryDiscounts = Object.keys(userCategoryDiscounts).length > 0;

  var grossTotal = 0;
  var totalDiscountAmt = 0;

  var rows = cart.map(function(item, i) {
    var rate = item.ratePerUnit;
    var lineTotal = rate * item.qty;
    grossTotal += lineTotal;

    var discPct = getItemDiscount(item);
    var lineDisc = discPct > 0 ? Math.round(lineTotal * discPct / 100 * 100) / 100 : 0;
    totalDiscountAmt += lineDisc;
    var lineNet = lineTotal - lineDisc;

    var totalPcs = item.pcsPerUnit * item.qty;
    var isPipe   = item.category === 'pipes';

    // Discount badge per line
    var discBadge = discPct > 0
      ? ' <span style="font-size:0.72rem;background:#e8f5e9;color:#2e7d32;padding:1px 5px;border-radius:3px;font-weight:600">' + discPct + '% off</span>'
      : '';

    return '<tr>'
      + '<td>' + (i+1) + '</td>'
      + '<td class="q-code">' + escapeHtml(item.code) + '</td>'
      + '<td>' + escapeHtml(item.name) + discBadge + '</td>'
      + '<td>' + escapeHtml(item.size) + '</td>'
      + '<td>' + escapeHtml(item.unitLabel) + '</td>'
      + '<td class="tr">' + fmtFull(rate) + '</td>'
      + '<td class="tr">' + item.qty + '</td>'
      + '<td class="tr">' + totalPcs.toLocaleString('en-IN') + ' ' + (isPipe ? 'pipes' : 'pcs') + '</td>'
      + (hasCategoryDiscounts
          ? '<td class="tr" style="color:#2e7d32">&minus;' + fmtFull(lineDisc) + '</td>'
            + '<td class="tr"><strong>' + fmtFull(lineNet) + '</strong></td>'
          : '<td class="tr"><strong>' + fmtFull(lineTotal) + '</strong></td>')
      + '</tr>';
  }).join('');

  var netTotal = grossTotal - totalDiscountAmt;

  // Thead extra column if category discounts
  var extraThDisc = hasCategoryDiscounts ? '<th>Discount</th><th>Net Amount</th>' : '<th>Amount</th>';

  // Discount summary row
  var discountInfo = '';
  if (totalDiscountAmt > 0) {
    var colSpan = hasCategoryDiscounts ? 8 : 8;
    discountInfo = '<tr class="discount-row"><td colspan="' + colSpan + '" class="tr" style="color:#2e7d32;font-weight:600">'
      + (hasCategoryDiscounts ? 'Category Discounts Applied' : ('Discount Applied: ' + userDiscount + '%'))
      + ' (You save: ' + fmtFull(totalDiscountAmt) + ')</td>'
      + (hasCategoryDiscounts ? '<td class="tr" style="color:#2e7d32;font-weight:600">&minus;' + fmtFull(totalDiscountAmt) + '</td><td></td>' : '<td class="tr" style="color:#2e7d32;font-weight:600">&minus;' + fmtFull(totalDiscountAmt) + '</td>')
      + '</tr>';
  }

  // Dealer info
  var dealerInfo = '';
  if (userData) {
    if (userData.role === 'salesman') {
      var dId = parseInt(localStorage.getItem('wf_salesman_dealer'));
      var d = linkedDealers.find(function(x) { return x.id === dId; });
      if (d) {
        dealerInfo = '<div class="quote-dealer">'
          + '<div><strong>Dealer:</strong> ' + escapeHtml(d.company_name) + ' (' + escapeHtml(d.contact_name) + ')</div>'
          + '<div><strong>Salesman:</strong> ' + escapeHtml(userData.contact_name) + '</div>'
          + '</div>';
      } else {
        dealerInfo = '<div class="quote-dealer"><div>Select a dealer first.</div></div>';
      }
    } else {
      dealerInfo = '<div class="quote-dealer">'
        + '<div><strong>Dealer:</strong> ' + escapeHtml(userData.company_name) + '</div>'
        + '<div>' + escapeHtml(userData.contact_name) + ' &bull; ' + escapeHtml(userData.phone) + '</div>'
        + '</div>';
    }
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
    +   (totalDiscountAmt > 0 ? '<div style="color:#2e7d32;font-weight:700">&#127991; Discounts Applied</div>' : '')
    + '</div>'
    + '</div>'
    + dealerInfo
    + '<div class="quote-scroll">'
    + '<table class="quote-table">'
    +   '<thead><tr><th>#</th><th>Code</th><th>Product</th><th>Size</th><th>Unit</th>'
    +   '<th>Rate/Unit</th><th>Units</th><th>Qty (total)</th>' + extraThDisc + '</tr></thead>'
    +   '<tbody>' + rows + '</tbody>'
    +   '<tfoot>'
    +   (totalDiscountAmt > 0
      ? '<tr><td colspan="' + (hasCategoryDiscounts ? '9' : '8') + '" class="tr">Subtotal (before discounts)</td><td class="tr">' + fmtFull(grossTotal) + '</td></tr>'
        + discountInfo
      : '')
    +   '<tr class="total-row">'
    +     '<td colspan="' + (hasCategoryDiscounts ? '9' : '8') + '" class="tr"><strong>Net Total</strong></td>'
    +     '<td class="tr"><strong>' + fmtFull(netTotal) + '</strong></td>'
    +   '</tr>'
    +   (function() {
          var taxRows = '';
          var gstPct = taxSettings.gst_percent || 0;
          var colSpanTax = hasCategoryDiscounts ? '9' : '8';
          if (gstPct > 0) {
            var gstAmt = Math.round(netTotal * gstPct / 100 * 100) / 100;
            taxRows += '<tr><td colspan="' + colSpanTax + '" class="tr">GST (' + gstPct + '%)</td><td class="tr">' + fmtFull(gstAmt) + '</td></tr>';
          }
          var otherTotal = 0;
          (taxSettings.other_charges || []).forEach(function(ch) {
            var amt = ch.type === 'percent' ? Math.round(netTotal * ch.value / 100 * 100) / 100 : (ch.value || 0);
            otherTotal += amt;
            if (amt > 0) {
              taxRows += '<tr><td colspan="' + colSpanTax + '" class="tr">' + escapeHtml(ch.name) + (ch.type === 'percent' ? ' (' + ch.value + '%)' : '') + '</td><td class="tr">' + fmtFull(amt) + '</td></tr>';
            }
          });
          var grandTotal = netTotal + (gstPct > 0 ? Math.round(netTotal * gstPct / 100 * 100) / 100 : 0) + otherTotal;
          taxRows += '<tr class="total-row" style="background:#e8eaf6"><td colspan="' + colSpanTax + '" class="tr"><strong>Grand Total</strong></td><td class="tr"><strong>' + fmtFull(grandTotal) + '</strong></td></tr>';
          return taxRows;
        })()
    +   (hasTbd ? '<tr><td colspan="' + (hasCategoryDiscounts ? '11' : '9') + '" class="quote-note">* Items with "\u2014" are contact-for-price and excluded from total</td></tr>' : '')
    +   '</tfoot>'
    + '</table>'
    + '</div>'
    + '<div class="quote-footer-note">'
    +   (totalDiscountAmt > 0 ? '<p>\u2022 Trade discounts applied per product category as per agreement</p>' : '')
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
  var hasCategoryDiscounts = Object.keys(userCategoryDiscounts).length > 0;

  var lines = cart.map(function(i) {
    var n      = i.pcsPerUnit * i.qty;
    var isPipe = i.category === 'pipes';
    var lineTotal = i.ratePerUnit * i.qty;
    var discPct = getItemDiscount(i);
    var lineDisc = discPct > 0 ? Math.round(lineTotal * discPct / 100 * 100) / 100 : 0;
    var lineNet = lineTotal - lineDisc;
    var discBadge = discPct > 0
      ? ' <span style="font-size:0.72rem;background:#e8f5e9;color:#2e7d32;padding:1px 4px;border-radius:3px">' + discPct + '%\u2193</span>'
      : '';
    return '<div class="order-item-preview">'
      + '<span class="oip-code">' + escapeHtml(i.code) + '</span>'
      + '<span class="oip-name">' + escapeHtml(i.name) + ' ' + escapeHtml(i.size) + discBadge + '</span>'
      + '<span class="oip-unit">' + escapeHtml(i.unitLabel) + ' \u00D7 ' + i.qty + '</span>'
      + '<span class="oip-total">' + n.toLocaleString('en-IN') + ' ' + (isPipe?'pipes':'pcs')
        + ' \u00B7 '
        + (lineDisc > 0
            ? '<s style="color:#999;font-size:0.85em">' + fmtFull(lineTotal) + '</s> ' + fmtFull(lineNet)
            : fmtFull(lineTotal))
        + '</span>'
      + '</div>';
  }).join('');

  var subtotal    = cartTotal();
  var discAmt     = cartDiscountAmt();
  var netTotal    = cartNetTotal();

  var discountNote = '';
  if (discAmt > 0) {
    discountNote = '<div style="text-align:right;font-size:0.82rem;margin-top:8px;padding-top:8px;border-top:1px solid #e0e0e0">'
      + '<div>Subtotal: ' + fmtFull(subtotal) + '</div>'
      + '<div style="color:#2e7d32;font-weight:600">'
      + (hasCategoryDiscounts ? 'Category Discounts: ' : ('Discount (' + userDiscount + '%): '))
      + '&minus;' + fmtFull(discAmt) + '</div>'
      + '<div style="font-weight:700;font-size:0.9rem;margin-top:4px">Net Total: ' + fmtFull(netTotal) + '</div>'
      + '</div>';
  }

  return '<div class="order-cart-preview">'
    + '<div class="ocp-header">'
    +   '<strong>' + cartLineCount() + ' item' + (cartLineCount()!==1?'s':'') + '</strong>'
    +   '<span>Grand Total: <strong>' + fmtFull(cartGrandTotal()) + '</strong></span>'
    + '</div>'
    + lines
    + discountNote
    + '<div style="text-align:right;font-size:0.82rem;margin-top:8px;padding-top:8px;border-top:1px solid #e0e0e0">'
    + '<div>Net Total: ' + fmtFull(netTotal) + '</div>'
    + '<div>GST (' + (taxSettings.gst_percent || 0) + '%): ' + fmtFull(cartGstAmt()) + '</div>'
    + (function() {
        var h = '';
        (taxSettings.other_charges || []).forEach(function(ch) {
          var amt = ch.type === 'percent' ? Math.round(netTotal * ch.value / 100 * 100) / 100 : (ch.value || 0);
          h += '<div>' + escapeHtml(ch.name) + (ch.type === 'percent' ? ' (' + ch.value + '%)' : '') + ': ' + fmtFull(amt) + '</div>';
        });
        return h;
      })()
    + '<div style="font-weight:700;font-size:0.9rem;margin-top:4px">Grand Total: ' + fmtFull(cartGrandTotal()) + '</div>'
    + '</div>'
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
      qty: i.qty,
      trade_category: getProductTradeCategory(i) // for server-side per-category discount
    };
  });

  var payload = { brand_id: brandId, items: items, notes: formData.notes || '', discount_percent: userDiscount || 0 };
  if (userData && userData.role === 'salesman') {
    payload.dealer_id = parseInt(localStorage.getItem('wf_salesman_dealer'));
    if (!payload.dealer_id) {
      alert('Please select a dealer first.');
      submitBtn.disabled = false;
      submitBtn.textContent = '\uD83D\uDED2 Place Order';
      return;
    }
  }

  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
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
              + '<br>Net Total: ' + fmtFull(order.net_amount || order.total_amount)
              + '<br>GST (' + (taxSettings.gst_percent || 0) + '%): ' + fmtFull(Math.round((order.net_amount || order.total_amount) * (taxSettings.gst_percent || 0) / 100 * 100) / 100)
              + '<br><strong>Grand Total: ' + fmtFull((order.net_amount || order.total_amount) + Math.round((order.net_amount || order.total_amount) * (taxSettings.gst_percent || 0) / 100 * 100) / 100 + cartOtherChargesAmt()) + '</strong>'
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

function renderDealerPickerStore() {
  var header = document.querySelector('.header');
  if (!header) return;
  var currentDealer = localStorage.getItem('wf_salesman_dealer');
  var html = '<div style="background:#f9a825;color:#1a237e;padding:6px 12px;display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;font-weight:600">';
  html += '<span>👤 Salesman Mode</span>';
  html += '<select id="storeDealerSelect" style="padding:4px;border-radius:4px;border:none;max-width:200px" onchange="changeStoreDealer(this.value)">';
  if (!currentDealer) html += '<option value="">-- Select Dealer --</option>';
  linkedDealers.forEach(function(d) {
    html += '<option value="' + d.id + '"' + (currentDealer == d.id ? ' selected' : '') + '>' + escapeHtml(d.company_name) + '</option>';
  });
  html += '</select></div>';
  header.insertAdjacentHTML('afterend', html);
}

function changeStoreDealer(dealerId) {
  localStorage.setItem('wf_salesman_dealer', dealerId);
  applySelectedDealer();
}

function applySelectedDealer() {
  if (userData && userData.role !== 'salesman') return;
  var dealerId = parseInt(localStorage.getItem('wf_salesman_dealer'));
  var d = linkedDealers.find(function(x) { return x.id === dealerId; });
  if (d) {
    userDiscount = d.discount_percent || 0;
    userCategoryDiscounts = d.category_discounts || {};
  } else {
    userDiscount = 0;
    userCategoryDiscounts = {};
  }
  updateCartUI();
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

  // Fetch user data (discount, name, category discounts) — non-blocking
  fetch('/api/auth/me').then(function(res) {
    if (res.ok) return res.json();
    return null;
  }).then(function(data) {
    if (data && data.user) {
      userData = data.user;
      userDiscount = data.user.discount_percent || 0;
    }
    if (data && data.category_discounts) {
      userCategoryDiscounts = data.category_discounts;
    }
    if (userData && userData.role === 'salesman' && data && data.linked_dealers) {
      linkedDealers = data.linked_dealers;
      renderDealerPickerStore();
      applySelectedDealer();
    }
    // Re-render cart UI now that discounts are known
    updateCartUI();
  }).catch(function() {});

  // Fetch tax settings (GST + other charges)
  fetch('/api/settings/tax').then(function(res) { return res.ok ? res.json() : null; })
    .then(function(data) { if (data) { taxSettings = data; updateCartUI(); } })
    .catch(function() {});

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
