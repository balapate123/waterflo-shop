# Waterflo Modern UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the entire Waterflo UI (typography, icons, layout, spacing) and add brand logo/image management to the admin panel.

**Architecture:** CSS-first redesign — update design tokens in `:root`, swap emoji for inline SVG helper functions, restyle all components. Backend adds brand image columns + upload/update API endpoints. No framework changes — stays vanilla JS/CSS/HTML.

**Tech Stack:** Plus Jakarta Sans (Google Fonts), Lucide-style inline SVG icons, Express/multer for image uploads, SQLite (better-sqlite3).

**Spec:** `docs/superpowers/specs/2026-04-13-modern-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `css/style.css` | Modify | Design tokens, all component styles |
| `css/admin.css` | Modify | Admin-specific component styles |
| `index.html` | Modify | Two-tier header, search bar, dealer selector, brand cards |
| `brand.html` | Modify | Two-tier header, hero with logo, category tabs |
| `login.html` | Modify | Font import, input/button styling |
| `admin.html` | Modify | Brands tab, brand edit modal, brand chips |
| `js/app.js` | Modify | SVG icon helpers, emoji removal, dealer picker, cart rendering |
| `js/brand-config.js` | Modify | Add logo_url/banner_url fields |
| `js/icons.js` | Create | SVG icon registry (single source of truth for all icons) |
| `server/index.js` | Modify | Brand migration, CSP for Google Fonts |
| `server/routes/admin.js` | Modify | Brand upload/update endpoints |
| `server/routes/brands.js` | Modify | Include logo_url/banner_url in response |
| `server/db/schema.sql` | Modify | Add logo_url/banner_url columns |
| `server/db/seed.js` | Modify | Insert NULL for logo/banner columns |

---

## Task 1: SVG Icon Registry

Create a central icon helper so all pages can reference icons by name instead of emoji.

**Files:**
- Create: `js/icons.js`

- [ ] **Step 1: Create the icon registry file**

```js
// js/icons.js — SVG Icon Registry
// Usage: wfIcon('cart') returns an inline SVG string
// Sizes: 'sm' (16), 'md' (20), 'lg' (24)

var WF_ICONS = {
  'cart': '<path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>',
  'cart-circle': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>',
  'file-text': '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  'log-out': '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>',
  'search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'trash': '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>',
  'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  'minus': '<line x1="5" y1="12" x2="19" y2="12"/>',
  'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'home': '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
  'users': '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
  'user': '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
  'chevron-down': '<polyline points="6 9 12 15 18 9"/>',
  'upload': '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  'edit': '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>',
  'printer': '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  'clipboard': '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>',
  // Product category icons
  'pipe': '<rect x="4" y="4" width="16" height="4" rx="1"/><line x1="4" y1="8" x2="4" y2="20"/><line x1="20" y1="8" x2="20" y2="20"/>',
  'wrench': '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  'arrow-down-wide': '<path d="M3 4h13M3 8h9M3 12h5"/><polyline points="16 6 16 18"/><polyline points="12 14 16 18 20 14"/>',
  'circle-dot': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>',
  'toggle': '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"/><circle cx="8" cy="12" r="3"/>',
  'package': '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  'grid': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  'combine': '<rect x="2" y="2" width="8" height="8" rx="2"/><rect x="14" y="14" width="8" height="8" rx="2"/><path d="M7 14v1a2 2 0 002 2h1"/><path d="M14 7h1a2 2 0 012 2v1"/>',
  'list': '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
  'grid-view': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  'color-palette': '<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="11.5" r="2.5"/><circle cx="6.5" cy="11.5" r="2.5"/><circle cx="17" cy="18.5" r="2.5"/><circle cx="8.5" cy="18.5" r="2.5"/>',
  'toggle-switch': '<rect x="1" y="5" width="22" height="14" rx="7" ry="7"/><circle cx="16" cy="12" r="3"/>',
  'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
};

// Category → icon name mapping
var CATEGORY_ICONS = {
  pipes: 'pipe',
  fittings: 'wrench',
  reducers: 'arrow-down-wide',
  brass: 'circle-dot',
  valves: 'toggle',
  mixer: 'combine',
  accessories: 'package',
  fabricated: 'wrench',
  all: 'grid'
};

function wfIcon(name, size) {
  var s = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  var pathData = WF_ICONS[name];
  if (!pathData) return '';
  return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + pathData + '</svg>';
}

function wfCategoryIcon(category, size) {
  var iconName = CATEGORY_ICONS[category] || 'package';
  return wfIcon(iconName, size);
}
```

- [ ] **Step 2: Verify the file exists and is syntactically valid**

Run: `node -e "require('./js/icons.js')"` from project root. This won't output anything (no module.exports) but confirms no syntax errors.

Expected: No errors, no output.

- [ ] **Step 3: Commit**

```bash
git add js/icons.js
git commit -m "feat: add SVG icon registry (js/icons.js)"
```

---

## Task 2: Design System — CSS Variables & Typography

Update the CSS `:root` tokens and base styles. This is the foundation everything else builds on.

**Files:**
- Modify: `css/style.css:1-30` (root variables and base styles)

- [ ] **Step 1: Update `:root` variables and base styles**

Replace lines 1-29 of `css/style.css` with:

```css
/* ─── RESET & BASE ─────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary: #1a237e;
  --primary-dark: #0f172a;
  --primary-light: #3949ab;
  --accent: #c62828;
  --gold: #f9a825;
  --bg: #f8fafc;
  --card: #ffffff;
  --text: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.12);
  --focus-ring: 0 0 0 3px rgba(26,35,126,0.1);
  --radius: 12px;
  --radius-sm: 8px;
}

html { font-size: 16px; }

body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: Update CSP in `server/index.js` to allow Google Fonts**

In `server/index.js`, update the helmet CSP directives (lines 123-138). Change `styleSrc`, `fontSrc`, and `imgSrc`:

```js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    }
  },
  crossOriginEmbedderPolicy: false,
}));
```

- [ ] **Step 3: Verify font loads**

Start the server (`npm start`), open the site in a browser, open DevTools → Network tab, confirm `Plus+Jakarta+Sans` font files load from `fonts.gstatic.com` without CSP errors.

- [ ] **Step 4: Commit**

```bash
git add css/style.css server/index.js
git commit -m "feat: update design tokens and typography to Plus Jakarta Sans"
```

---

## Task 3: Backend — Brand Logo/Banner Schema & Migration

Add `logo_url` and `banner_url` columns to the brands table, update seed script, and add migration to `server/index.js`.

**Files:**
- Modify: `server/db/schema.sql:2-12`
- Modify: `server/db/seed.js:60-68`
- Modify: `server/index.js:40-46` (add migration block)

- [ ] **Step 1: Update schema.sql**

Replace the brands table definition (lines 3-12):

```sql
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  tagline TEXT,
  color TEXT,
  unit_logic TEXT,
  price_date TEXT,
  logo_url TEXT,
  banner_url TEXT,
  active INTEGER DEFAULT 1
);
```

- [ ] **Step 2: Add migration in server/index.js**

After the existing `image_url` migration block (after line 46), add:

```js
// Migrations: add logo_url and banner_url to brands if missing
try {
  db.prepare("SELECT logo_url FROM brands LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE brands ADD COLUMN logo_url TEXT");
  db.exec("ALTER TABLE brands ADD COLUMN banner_url TEXT");
  console.log('Migration: added logo_url and banner_url to brands table');
}
```

- [ ] **Step 3: Update seed.js insert statement**

Replace the `insertBrand` prepared statement (lines 60-63) and the insert call (line 66):

```js
const insertBrand = db.prepare(`
  INSERT INTO brands (id, name, short_name, tagline, color, unit_logic, price_date, logo_url, banner_url)
  VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL)
`);
```

And update the `insertBrand.run` call (line 66):

```js
  insertBrand.run(b.id, b.name, b.shortName, b.tagline, b.color, b.unitLogic, b.priceDate);
```

(The run call stays the same — SQLite fills NULL for logo_url/banner_url via the VALUES clause.)

- [ ] **Step 4: Create uploads/brands directory**

```bash
mkdir -p uploads/brands
```

- [ ] **Step 5: Verify migration runs on server start**

```bash
npm start
```

Check console output for: `Migration: added logo_url and banner_url to brands table` (only shows first time).

- [ ] **Step 6: Commit**

```bash
git add server/db/schema.sql server/db/seed.js server/index.js
git commit -m "feat: add logo_url and banner_url columns to brands table"
```

---

## Task 4: Backend — Brand Image Upload & Update API

Add endpoints to upload brand images and update brand metadata.

**Files:**
- Modify: `server/routes/admin.js:8-25` (add brand upload config)
- Modify: `server/routes/admin.js` (add new endpoints at end of file)
- Modify: `server/routes/brands.js:9-14` (include logo/banner in response)

- [ ] **Step 1: Add brand image upload config in admin.js**

After the existing `upload` multer config (line 25), add a second multer config for brands:

```js
// Brand image upload config
const brandStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = path.join(__dirname, '..', '..', 'uploads', 'brands');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = 'brand_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + ext;
    cb(null, name);
  }
});
const brandUpload = multer({
  storage: brandStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});
```

- [ ] **Step 2: Add brand endpoints at the end of admin.js (before `module.exports`)**

```js
// ─── BRAND MANAGEMENT ────────────────────────────────────────────────────────

// Upload brand image
router.post('/brands/upload-image', brandUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No valid image file uploaded (jpg, png, webp, max 2MB)' });
  res.json({ image_url: '/uploads/brands/' + req.file.filename });
});

// Get all brands (admin)
router.get('/brands', (req, res) => {
  const db = req.app.get('db');
  const brands = db.prepare('SELECT * FROM brands ORDER BY name').all();
  res.json({ brands });
});

// Update brand
router.put('/brands/:id', (req, res) => {
  const db = req.app.get('db');
  const brandId = req.params.id;
  const b = req.body;

  const existing = db.prepare('SELECT id FROM brands WHERE id = ?').get(brandId);
  if (!existing) return res.status(404).json({ error: 'Brand not found' });

  const fields = ['logo_url', 'banner_url', 'tagline', 'color', 'active'];
  const updates = [];
  const params = [];

  for (const f of fields) {
    if (b[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(b[f]);
    }
  }

  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

  params.push(brandId);
  db.prepare(`UPDATE brands SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  const updated = db.prepare('SELECT * FROM brands WHERE id = ?').get(brandId);
  res.json({ brand: updated });
});
```

- [ ] **Step 3: Update brands.js to include logo_url and banner_url**

In `server/routes/brands.js`, the query on line 9 already does `SELECT b.*`, which includes `logo_url` and `banner_url` automatically since we added those columns. Verify this by checking the response:

```bash
# After restarting server, test:
curl -s http://localhost:3000/api/brands -H "Cookie: <session_cookie>" | node -e "process.stdin.on('data',d=>console.log(JSON.parse(d).brands[0]))"
```

Confirm `logo_url` and `banner_url` appear (as `null`) in the response.

- [ ] **Step 4: Commit**

```bash
git add server/routes/admin.js server/routes/brands.js
git commit -m "feat: add brand image upload and update API endpoints"
```

---

## Task 5: Login Page Refresh

Update login.html with the new font and styling.

**Files:**
- Modify: `login.html`

- [ ] **Step 1: Add font import and update styles**

In `login.html`, add the Google Fonts link in `<head>` (after line 7, before `<style>`):

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Then update the `<style>` block — replace the existing body/auth styles. Key changes:
- `font-family: 'Plus Jakarta Sans', system-ui, sans-serif` on `.auth-page`
- Input `border: 1.5px solid #e2e8f0`, `background: #f8fafc`, `border-radius: 10px`
- Focus: `border-color: #1a237e; box-shadow: 0 0 0 3px rgba(26,35,126,0.1); background: white;`
- Button `border-radius: 10px` (already 10px, keep)
- Font weight updates on heading/labels

Replace `font-family: inherit;` on `.auth-field input` (line 95) with:
```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

- [ ] **Step 2: Test login page**

Open `/login.html` in browser. Verify:
- Plus Jakarta Sans font renders
- Inputs have subtle blue focus ring
- Buttons look clean
- Registration form still works

- [ ] **Step 3: Commit**

```bash
git add login.html
git commit -m "style: update login page typography and input styling"
```

---

## Task 6: Two-Tier Header — Homepage

Replace the single-row emoji header with a two-tier layout.

**Files:**
- Modify: `index.html:16-33` (header HTML)
- Modify: `css/style.css:31-65` (header CSS)

- [ ] **Step 1: Add icons.js script tag to index.html**

Add before the `brand-config.js` script tag (line 118):

```html
<script src="js/icons.js"></script>
```

- [ ] **Step 2: Replace the header HTML in index.html**

Replace lines 16-33 with the two-tier header:

```html
  <header class="header">
    <div class="header-top">
      <div class="logo-wrap">
        <div class="logo-mark">W</div>
        <div>
          <div class="logo-text">Water<span>flo</span>&reg;</div>
          <span class="logo-sub">Distributor Order Portal</span>
        </div>
      </div>
      <div class="header-user">
        <div class="header-user-info">
          <span class="header-user-name" id="userInfo"></span>
          <span class="header-user-role" id="userRole"></span>
        </div>
        <div class="header-avatar" id="userAvatar"></div>
      </div>
    </div>
    <nav class="header-nav">
      <a href="/" class="nav-item active" id="navBrands"></a>
      <button class="nav-item" id="homeCartBtn" onclick="toggleHomeCart()"></button>
      <button class="nav-item" id="myOrdersBtn" onclick="toggleMyOrders()"></button>
      <a href="/admin.html" class="nav-item" id="adminLink" style="display:none"></a>
      <button class="nav-item nav-item-right" id="logoutBtn" onclick="handleLogout()"></button>
    </nav>
  </header>
```

- [ ] **Step 3: Update the initLanding function to populate nav items with SVG icons**

In the `<script>` block of `index.html`, after `initLanding()` resolves user data (around line 128), add nav icon rendering:

```js
// Populate nav items with SVG icons
document.getElementById('navBrands').innerHTML = wfIcon('home', 'sm') + ' Brands';
document.getElementById('homeCartBtn').innerHTML = wfIcon('cart', 'sm') + ' <span class="cart-label">Cart</span><span class="cart-badge" id="homeCartBadge" style="display:none">0</span>';
document.getElementById('myOrdersBtn').innerHTML = wfIcon('file-text', 'sm') + ' Orders';
document.getElementById('adminLink').innerHTML = wfIcon('settings', 'sm') + ' Admin';
document.getElementById('logoutBtn').innerHTML = wfIcon('log-out', 'sm') + ' Logout';
```

And update the user info display:

```js
document.getElementById('userInfo').textContent = user.company_name || user.contact_name;
document.getElementById('userRole').textContent = user.role === 'admin' ? 'Admin' : user.role === 'salesman' ? 'Salesman' : 'Dealer';
document.getElementById('userAvatar').textContent = (user.company_name || user.contact_name || 'U').substring(0, 2).toUpperCase();
```

- [ ] **Step 4: Update header CSS in style.css**

Replace the header CSS section (lines 31-65) with:

```css
/* ─── HEADER ───────────────────────────────────────────────────────────────── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-top {
  background: var(--primary-dark);
  color: white;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.logo-wrap { display: flex; align-items: center; gap: 10px; }

.logo-mark {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 0.875rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: white;
}
.logo-text span { color: var(--gold); }

.logo-sub {
  font-size: 0.625rem;
  opacity: 0.5;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: block;
  line-height: 1.1;
  font-weight: 500;
}

.header-user { display: flex; align-items: center; gap: 10px; }

.header-user-info { text-align: right; }

.header-user-name {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5e1;
}

.header-user-role {
  display: block;
  font-size: 0.65rem;
  color: var(--text-secondary);
  text-transform: capitalize;
}

.header-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
}

.header-nav {
  background: var(--primary-dark);
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 2px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  overflow-x: auto;
  scrollbar-width: none;
}
.header-nav::-webkit-scrollbar { display: none; }

.nav-item {
  padding: 10px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  white-space: nowrap;
  text-decoration: none;
  font-family: inherit;
}
.nav-item:hover { color: #e2e8f0; }
.nav-item.active { color: #f8fafc; border-bottom-color: var(--gold); }

.nav-item-right { margin-left: auto; }

.nav-item .cart-badge {
  background: var(--accent);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

- [ ] **Step 5: Test the header**

Open the homepage. Verify:
- Two-tier header renders (branding top, nav bottom)
- SVG icons show instead of emoji
- User name and avatar initials show
- Cart badge works
- Admin link shows only for admin users
- Responsive on mobile (nav scrolls horizontally)

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: two-tier header with SVG icons on homepage"
```

---

## Task 7: Homepage — Search Bar & Dealer Selector Redesign

Replace the gradient-embedded search and crude dealer dropdown with clean components.

**Files:**
- Modify: `index.html:36-49` (hero/search HTML)
- Modify: `index.html:165-177` (renderDealerLanding function)
- Modify: `css/style.css:1094-1242` (landing hero and search styles)

- [ ] **Step 1: Replace hero/search HTML in index.html**

Replace the landing hero section (lines 36-49) with:

```html
  <!-- SEARCH AREA -->
  <div class="search-area" id="searchArea">
    <div class="search-bar-wrap" id="homeSearchWrap">
      <span class="search-bar-icon"></span>
      <input type="search" class="search-bar-input" id="homeSearchInput" placeholder="Search products across all brands..." autocomplete="off"
        oninput="homeProductSearch()" onkeydown="homeSearchKeydown(event)">
      <button class="search-bar-clear" id="homeSearchClear" onclick="clearHomeSearch()">&times;</button>
      <div class="home-lookup-results" id="homeLookupResults"></div>
    </div>
    <div class="search-bar-hint">Search by name, code, or size</div>
    <div class="home-product-detail" id="homeProductDetail"></div>
  </div>
```

- [ ] **Step 2: Add search icon rendering in initLanding**

After the nav icon rendering code added in Task 6, add:

```js
// Search bar icon
var searchIcon = document.querySelector('.search-bar-icon');
if (searchIcon) searchIcon.innerHTML = wfIcon('search', 'sm');
```

- [ ] **Step 3: Replace renderDealerLanding function**

Replace the `renderDealerLanding` function (lines 165-177) with:

```js
    function renderDealerLanding(dealers) {
      var searchArea = document.getElementById('searchArea');
      var currentDealer = localStorage.getItem('wf_salesman_dealer');
      var selectedDealer = currentDealer ? dealers.find(function(d) { return d.id == currentDealer; }) : null;

      var html = '<div class="dealer-selector-card">'
        + '<div class="dealer-selector-header">'
        + wfIcon('users', 'sm') + ' <span>Placing Order On Behalf Of</span>'
        + '</div>'
        + '<div class="dealer-selector-body">';

      if (selectedDealer) {
        var initials = (selectedDealer.company_name || 'D').substring(0, 2).toUpperCase();
        html += '<div class="dealer-selected">'
          + '<div class="dealer-avatar">' + initials + '</div>'
          + '<div class="dealer-info">'
          + '<div class="dealer-name">' + escHtml(selectedDealer.company_name) + '</div>'
          + '<div class="dealer-meta">' + (selectedDealer.address || '') + (selectedDealer.discount_percent ? ' &middot; ' + selectedDealer.discount_percent + '% discount' : '') + '</div>'
          + '</div>'
          + '<button class="dealer-change" onclick="this.closest(\'.dealer-selector-body\').querySelector(\'.dealer-dropdown\').style.display=\'block\';this.closest(\'.dealer-selected\').style.display=\'none\'">Change</button>'
          + '</div>';
      }

      html += '<div class="dealer-dropdown"' + (selectedDealer ? ' style="display:none"' : '') + '>'
        + '<select class="dealer-select" onchange="localStorage.setItem(\'wf_salesman_dealer\', this.value);location.reload()">';
      if (!currentDealer) html += '<option value="">-- Select Dealer --</option>';
      dealers.forEach(function(d) {
        html += '<option value="' + d.id + '"' + (currentDealer == d.id ? ' selected' : '') + '>' + escHtml(d.company_name) + '</option>';
      });
      html += '</select></div></div></div>';

      searchArea.insertAdjacentHTML('afterbegin', html);
    }
```

- [ ] **Step 4: Update CSS — replace landing hero and search styles**

Replace the `.landing-hero` and `.home-search-*` CSS sections (lines 1094-1242 approximately) with:

```css
/* ─── SEARCH AREA ──────────────────────────────────────────────────────────── */
.search-area {
  background: var(--bg);
  padding: 24px 16px 16px;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar-wrap {
  position: relative;
}

.search-bar-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
  display: flex;
}

.search-bar-input {
  width: 100%;
  padding: 12px 40px 12px 42px;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-bar-input::placeholder { color: var(--text-muted); }
.search-bar-input:focus {
  border-color: var(--primary);
  box-shadow: var(--focus-ring);
}

.search-bar-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.1rem;
  cursor: pointer;
  display: none;
  padding: 2px 6px;
}
.search-bar-clear:hover { color: var(--text); }

.search-bar-hint {
  text-align: center;
  margin-top: 8px;
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* ─── DEALER SELECTOR ──────────────────────────────────────────────────────── */
.dealer-selector-card {
  background: var(--card);
  border-radius: var(--radius);
  border: 1.5px solid var(--border);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
}

.dealer-selector-header {
  padding: 10px 16px;
  background: var(--border-light);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
}

.dealer-selector-body {
  padding: 14px 16px;
}

.dealer-selected {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #eff6ff;
  border-radius: var(--radius-sm);
  border: 1px solid #bfdbfe;
}

.dealer-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
}

.dealer-info { flex: 1; min-width: 0; }

.dealer-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text);
}

.dealer-meta {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-top: 1px;
}

.dealer-change {
  background: none;
  border: none;
  color: #2563eb;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.dealer-change:hover { text-decoration: underline; }

.dealer-select {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text);
  background: var(--bg);
  outline: none;
  font-family: inherit;
}
.dealer-select:focus { border-color: var(--primary); box-shadow: var(--focus-ring); }
```

- [ ] **Step 5: Test**

Open homepage. Verify:
- Clean white search bar with SVG icon
- Hint text below
- For salesman users: dealer selector shows as a card with avatar, not a raw dropdown on gradient
- Search autocomplete still works

- [ ] **Step 6: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: redesign homepage search bar and dealer selector"
```

---

## Task 8: Homepage — Full-Bleed Brand Cards

Replace the current brand cards with full-color gradient cards showing large logos.

**Files:**
- Modify: `index.html:147-163` (renderBrandGrid function)
- Modify: `css/style.css` (brand grid and card styles)

- [ ] **Step 1: Update renderBrandGrid function**

Replace the `renderBrandGrid` function in `index.html` (lines 147-163):

```js
    function renderBrandGrid(brands) {
      var grid = document.getElementById('brandGrid');
      grid.innerHTML = brands.map(function(b) {
        var cfg = getBrandById(b.id) || b;
        var gradient = cfg.heroGradient || 'linear-gradient(160deg, ' + (cfg.color || '#455a64') + ', ' + (cfg.color || '#455a64') + ')';
        var logoHtml = b.logo_url
          ? '<img src="' + escHtml(b.logo_url) + '" alt="' + escHtml(cfg.shortName || cfg.name) + '" class="brand-card-logo">'
          : '<div class="brand-card-icon-text">' + (cfg.icon || (cfg.shortName || '').substring(0, 2)) + '</div>';

        return '<a href="brand.html?brand=' + b.id + '" class="brand-card" style="background:' + gradient + '">'
          + '<div class="brand-card-logo-area">' + logoHtml + '</div>'
          + '<div class="brand-card-info">'
          + '<div class="brand-card-name">' + escHtml(cfg.name || b.name) + '</div>'
          + '<div class="brand-card-tagline">' + escHtml(cfg.tagline || b.tagline || '') + '</div>'
          + '</div>'
          + '</a>';
      }).join('');
    }
```

- [ ] **Step 2: Update brand card CSS**

Replace the `.brand-grid` and `.brand-card*` CSS (lines 1114-1196 approximately) with:

```css
/* ─── BRAND GRID ───────────────────────────────────────────────────────────── */
.brand-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  padding: 16px;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 600px) {
  .brand-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 24px; }
}
@media (min-width: 900px) {
  .brand-grid { grid-template-columns: repeat(4, 1fr); }
}

.brand-card {
  border-radius: var(--radius);
  overflow: hidden;
  text-decoration: none;
  color: white;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  padding: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-sm);
  position: relative;
}
.brand-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-md);
}

.brand-card-logo-area {
  margin-bottom: auto;
}

.brand-card-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 10px;
  background: rgba(255,255,255,0.15);
  padding: 4px;
}

.brand-card-icon-text {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: white;
  letter-spacing: 1px;
}

.brand-card-info {
  margin-top: 12px;
}

.brand-card-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.brand-card-tagline {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.75);
  line-height: 1.3;
  margin-top: 2px;
}

.landing-footer {
  text-align: center;
  padding: 24px 16px;
  font-size: 0.75rem;
  color: var(--text-secondary);
}
```

- [ ] **Step 3: Test**

Open homepage. Verify:
- Brand cards are full-color gradient
- 2-letter fallback icon shows in rounded square
- Hover scales the card slightly
- Grid is 2-col mobile, 3-col tablet, 4-col desktop
- Cards link to correct brand page

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: full-bleed color brand cards with logo support"
```

---

## Task 9: Brand Page — Header, Hero & Category Tabs

Apply two-tier header to brand page and clean up category tabs (remove emoji).

**Files:**
- Modify: `brand.html:16-57` (header, hero, category tabs HTML)
- Modify: `js/app.js:585-594` (icon functions)
- Modify: `js/app.js:739-747` (renderCategoryTabs)

- [ ] **Step 1: Add icons.js to brand.html**

Add before the `brand-config.js` script tag at end of brand.html:

```html
<script src="js/icons.js"></script>
```

- [ ] **Step 2: Replace brand.html header**

Replace lines 16-30 with the same two-tier header pattern (adapted for brand page):

```html
  <header class="header" id="brandHeader">
    <div class="header-top">
      <div class="logo-wrap">
        <a href="index.html" class="back-btn" title="Back to Brands"></a>
        <div>
          <div class="logo-text">Water<span>flo</span>&reg;</div>
          <span class="logo-sub">Pipes &amp; Fittings</span>
        </div>
      </div>
      <div class="header-user">
        <button class="nav-item" id="cartBtn" aria-label="Open Cart"></button>
        <button class="nav-item" id="logoutBtn" onclick="handleLogout()" title="Logout"></button>
      </div>
    </div>
  </header>
```

- [ ] **Step 3: Update app.js — replace emoji icon functions**

Replace `getProductIcon` function (lines 592-594) with:

```js
function getProductIcon(p) {
  return wfCategoryIcon(p.category, 'lg');
}
```

Replace `getCategoryIcon` function (lines 585-590) with:

```js
function getCategoryIcon(code) {
  var p = PRODUCTS.find(function(x) { return x.code === code; });
  if (!p) return wfCategoryIcon('all', 'sm');
  return wfCategoryIcon(p.category, 'sm');
}
```

- [ ] **Step 4: Update renderCategoryTabs to remove emoji**

Replace `renderCategoryTabs` (lines 739-747):

```js
function renderCategoryTabs() {
  document.getElementById('categoryTabs').innerHTML = CATEGORIES.map(function(c) {
    return '<button class="cat-tab ' + (activeCategory === c.id ? 'active' : '') + '"'
      + ' onclick="setCategory(\'' + c.id + '\')"'
      + ' style="' + (activeCategory === c.id ? 'background:' + c.color + ';border-color:' + c.color + ';color:white' : '') + '">'
      + c.label
      + '</button>';
  }).join('');
}
```

(Simply removed `c.icon + ' ' +` from the button content.)

- [ ] **Step 5: Update brand page init to populate SVG icons**

In `js/app.js`, find the `init` function and add icon rendering for the header buttons. After `applyBrandTheme()` call, add:

```js
// Populate header icons
var backBtn = document.querySelector('.back-btn');
if (backBtn) backBtn.innerHTML = wfIcon('arrow-left', 'sm');
var cartBtn = document.getElementById('cartBtn');
if (cartBtn) cartBtn.innerHTML = wfIcon('cart', 'sm') + ' <span class="cart-label">Cart</span><span class="cart-badge" id="cartBadge" style="display:none">0</span>';
var logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) logoutBtn.innerHTML = wfIcon('log-out', 'sm');
```

- [ ] **Step 6: Update search icon in filter bar**

Replace the emoji search icon in `brand.html` (line 47):

```html
<span class="search-icon" id="filterSearchIcon"></span>
```

Then in app.js init, add:

```js
var filterSearchIcon = document.getElementById('filterSearchIcon');
if (filterSearchIcon) filterSearchIcon.innerHTML = wfIcon('search', 'sm');
```

- [ ] **Step 7: Test**

Open a brand page. Verify:
- Two-tier header (or single-row compact header) with SVG icons
- Back arrow is SVG, not text arrow
- Category tabs have no emoji prefix
- Product cards show SVG icons instead of emoji
- Cart button shows SVG icon
- Search icon is SVG

- [ ] **Step 8: Commit**

```bash
git add brand.html js/app.js
git commit -m "feat: brand page header, category tabs, and SVG icons"
```

---

## Task 10: Product Cards & Cart — Remove All Emoji

Replace remaining emoji in product cards, cart items, and empty states.

**Files:**
- Modify: `js/app.js:597-651` (renderGridCard)
- Modify: `js/app.js:653-700` (renderListCard)
- Modify: `js/app.js:471-480` (renderCartItems empty state)
- Modify: `js/app.js:507-531` (cart item rendering)

- [ ] **Step 1: Update renderGridCard — replace emoji image fallback**

In `renderGridCard` (line 620), replace the emoji fallback:

```js
  var imageContent = p.image_url
    ? '<img src="' + escapeHtml(p.image_url) + '" alt="' + escapeHtml(p.name) + '" class="product-img">'
    : '<span class="product-icon">' + wfCategoryIcon(p.category, 'lg') + '</span>';
```

Update the add-to-cart button (line 647) — replace `+ Add to Cart` text:

```js
      +   '<button class="add-btn" onclick="addToCart(\'' + p.code + '\')">' + wfIcon('plus', 'sm') + ' Add to Cart</button>'
```

- [ ] **Step 2: Update renderListCard — replace emoji fallback**

In `renderListCard` (line 668), replace:

```js
  var listImageContent = p.image_url
    ? '<img src="' + escapeHtml(p.image_url) + '" alt="' + escapeHtml(p.name) + '" class="pli-img">'
    : '<span class="pli-icon">' + wfCategoryIcon(p.category) + '</span>';
```

- [ ] **Step 3: Update cart empty state**

In `renderCartItems` (line 476), replace the emoji:

```js
      + '<div class="cart-empty-icon">' + wfIcon('cart', 'lg') + '</div>'
```

- [ ] **Step 4: Update cart item remove button**

In `renderCartItems` (line 531), replace the trash emoji:

```js
        +     '<button class="cart-remove" onclick="removeFromCart(\'' + item.cartKey + '\')">' + wfIcon('trash', 'sm') + '</button>'
```

- [ ] **Step 5: Update the "Added!" feedback**

In the `addToCart` function (line 427), replace the checkmark emoji:

```js
  btn.innerHTML = wfIcon('check', 'sm') + ' Added!';
```

And the reset:

```js
  setTimeout(function() { btn.innerHTML = wfIcon('plus', 'sm') + ' Add to Cart'; btn.classList.remove('added'); }, 1400);
```

- [ ] **Step 6: Update renderDealerPickerStore (brand page salesman mode)**

Replace the `renderDealerPickerStore` function (lines 1134-1147) to remove the emoji:

```js
function renderDealerPickerStore() {
  var header = document.querySelector('.header');
  if (!header) return;
  var currentDealer = localStorage.getItem('wf_salesman_dealer');
  var html = '<div class="salesman-bar">';
  html += '<span>' + wfIcon('users', 'sm') + ' Salesman Mode</span>';
  html += '<select id="storeDealerSelect" class="dealer-select" style="max-width:200px" onchange="changeStoreDealer(this.value)">';
  if (!currentDealer) html += '<option value="">-- Select Dealer --</option>';
  linkedDealers.forEach(function(d) {
    html += '<option value="' + d.id + '"' + (currentDealer == d.id ? ' selected' : '') + '>' + escapeHtml(d.company_name) + '</option>';
  });
  html += '</select></div>';
  header.insertAdjacentHTML('afterend', html);
}
```

- [ ] **Step 7: Add salesman bar CSS**

Add to `css/style.css`:

```css
/* ─── SALESMAN BAR ─────────────────────────────────────────────────────────── */
.salesman-bar {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  gap: 12px;
}
.salesman-bar svg { vertical-align: middle; }
```

- [ ] **Step 8: Update product card CSS for icon styling**

Add to `css/style.css`, near the product card section:

```css
.product-icon, .pli-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.7);
}
```

- [ ] **Step 9: Test thoroughly**

Open brand page. Verify:
- Grid cards show SVG icons (not emoji) when no product image
- List view shows SVG icons
- Cart panel: empty state uses SVG cart icon
- Cart items: remove button uses SVG trash
- "Added!" feedback uses SVG checkmark
- Salesman mode bar uses SVG user icon

- [ ] **Step 10: Commit**

```bash
git add js/app.js css/style.css
git commit -m "feat: replace all emoji with SVG icons in products and cart"
```

---

## Task 11: Admin — Brands Tab & Brand Edit Modal

Add the new Brands management tab to the admin dashboard.

**Files:**
- Modify: `admin.html:29-35` (tab nav — add Brands tab)
- Modify: `admin.html` (add brands panel and modal HTML)
- Modify: `admin.html` (add brands JS functions in script block)
- Modify: `css/admin.css` (brand management styles)

- [ ] **Step 1: Add Brands tab to admin nav**

In `admin.html`, update the tab nav (lines 29-35). Add a Brands tab before Settings:

```html
  <nav class="admin-tabs" id="adminTabs">
    <button class="admin-tab active" data-tab="dashboard" onclick="switchTab('dashboard')">Dashboard</button>
    <button class="admin-tab" data-tab="users" onclick="switchTab('users')">Users <span class="tab-badge" id="pendingBadge" style="display:none">0</span></button>
    <button class="admin-tab" data-tab="orders" onclick="switchTab('orders')">Orders</button>
    <button class="admin-tab" data-tab="products" onclick="switchTab('products')">Products</button>
    <button class="admin-tab" data-tab="brands" onclick="switchTab('brands')">Brands</button>
    <button class="admin-tab" data-tab="settings" onclick="switchTab('settings')">Settings</button>
  </nav>
```

- [ ] **Step 2: Add Brands panel HTML**

Add a new tab panel section right before the Settings panel (before `<!-- ═══ SETTINGS TAB ═══ -->`):

```html
    <!-- ═══ BRANDS TAB ═══ -->
    <section class="tab-panel" id="panel-brands">
      <div class="panel-toolbar">
        <h2>Brand Management</h2>
        <p style="color:var(--text-secondary);font-size:0.82rem">Upload logos, banners, and customize brand appearance</p>
      </div>
      <div class="brand-mgmt-grid" id="brandMgmtGrid"></div>
    </section>
```

- [ ] **Step 3: Add Brand Edit Modal HTML**

Add after the existing modals (before the closing `</main>` or after the last modal):

```html
  <!-- ═══ BRAND EDIT MODAL ═══ -->
  <div class="modal" id="brandEditModal">
    <div class="modal-content" style="max-width:500px">
      <div class="modal-header">
        <h2 id="brandEditTitle">Edit Brand</h2>
        <button onclick="closeModal('brandEditModal')">&times;</button>
      </div>
      <div class="modal-body">
        <form id="brandEditForm" onsubmit="saveBrandEdit(event)">
          <input type="hidden" id="be_id">

          <div class="form-group">
            <label>Brand Logo</label>
            <div class="brand-upload-area" id="beLogoArea">
              <div class="brand-upload-preview" id="beLogoPreview" style="display:none">
                <img id="beLogoImg" src="" alt="Logo">
                <button type="button" class="brand-upload-remove" onclick="removeBrandImage('logo')">Remove</button>
              </div>
              <div class="brand-upload-dropzone" id="beLogoDrop">
                <input type="file" id="beLogoFile" accept=".jpg,.jpeg,.png,.webp" onchange="previewBrandImage(this, 'logo')" style="display:none">
                <button type="button" class="brand-upload-btn" onclick="document.getElementById('beLogoFile').click()">Upload Logo</button>
                <small>Square image, JPG/PNG/WebP, max 2MB</small>
              </div>
            </div>
            <input type="hidden" id="be_logo_url">
          </div>

          <div class="form-group">
            <label>Banner Image (optional)</label>
            <div class="brand-upload-area" id="beBannerArea">
              <div class="brand-upload-preview wide" id="beBannerPreview" style="display:none">
                <img id="beBannerImg" src="" alt="Banner">
                <button type="button" class="brand-upload-remove" onclick="removeBrandImage('banner')">Remove</button>
              </div>
              <div class="brand-upload-dropzone" id="beBannerDrop">
                <input type="file" id="beBannerFile" accept=".jpg,.jpeg,.png,.webp" onchange="previewBrandImage(this, 'banner')" style="display:none">
                <button type="button" class="brand-upload-btn" onclick="document.getElementById('beBannerFile').click()">Upload Banner</button>
                <small>Wide image for brand page hero, max 2MB</small>
              </div>
            </div>
            <input type="hidden" id="be_banner_url">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Brand Color</label>
              <div style="display:flex;gap:8px;align-items:center">
                <input type="color" id="be_color" style="width:40px;height:34px;padding:2px;border:1px solid var(--border);border-radius:4px;cursor:pointer">
                <input type="text" id="be_color_hex" placeholder="#c62828" style="flex:1" oninput="document.getElementById('be_color').value=this.value">
              </div>
            </div>
            <div class="form-group">
              <label>Active</label>
              <select id="be_active" style="width:100%;padding:8px;border:1.5px solid #e2e8f0;border-radius:8px;font-family:inherit">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Tagline</label>
            <input type="text" id="be_tagline" placeholder="e.g. Always Ahead In Quality">
          </div>

          <button type="submit" class="btn-admin-primary" style="width:100%;margin-top:8px">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
```

- [ ] **Step 4: Add icons.js script tag to admin.html**

Add before the first `<script>` in admin.html:

```html
<script src="js/icons.js"></script>
```

- [ ] **Step 5: Add brand management JS functions**

Add these functions inside the admin.html `<script>` block:

```js
    // ═══ BRANDS TAB ═══

    async function loadBrands() {
      var grid = document.getElementById('brandMgmtGrid');
      if (!grid) return;
      grid.innerHTML = '<p style="text-align:center;padding:24px;color:#888">Loading...</p>';

      var r = await apiFetch('/api/admin/brands');
      if (!r.ok) { grid.innerHTML = '<p style="text-align:center;color:#c62828">Error loading brands</p>'; return; }
      var data = await r.json();
      var brands = data.brands || [];

      grid.innerHTML = brands.map(function(b) {
        var logoHtml = b.logo_url
          ? '<img src="' + escapeHtml(b.logo_url) + '" alt="" class="bmg-logo">'
          : '<div class="bmg-icon" style="background:' + (b.color || '#455a64') + '">' + (b.short_name || b.name || '').substring(0, 2) + '</div>';

        return '<div class="bmg-card" onclick="openBrandEdit(\'' + escapeHtml(b.id) + '\')">'
          + '<div class="bmg-logo-area">' + logoHtml + '</div>'
          + '<div class="bmg-info">'
          + '<div class="bmg-name">' + escapeHtml(b.short_name || b.name) + '</div>'
          + '<div class="bmg-tagline">' + escapeHtml(b.tagline || '') + '</div>'
          + '<div class="bmg-status">'
          + (b.logo_url ? '<span class="bmg-badge bmg-badge-ok">Logo</span>' : '<span class="bmg-badge">No logo</span>')
          + (b.banner_url ? '<span class="bmg-badge bmg-badge-ok">Banner</span>' : '')
          + (b.active === 0 ? '<span class="bmg-badge bmg-badge-warn">Inactive</span>' : '')
          + '</div>'
          + '</div>'
          + '</div>';
      }).join('');
    }

    var brandEditData = {};

    async function openBrandEdit(brandId) {
      var r = await apiFetch('/api/admin/brands');
      if (!r.ok) return;
      var data = await r.json();
      var b = (data.brands || []).find(function(x) { return x.id === brandId; });
      if (!b) return;

      brandEditData = { id: b.id, logo_url: b.logo_url, banner_url: b.banner_url };

      document.getElementById('be_id').value = b.id;
      document.getElementById('brandEditTitle').textContent = 'Edit: ' + (b.short_name || b.name);
      document.getElementById('be_tagline').value = b.tagline || '';
      document.getElementById('be_color').value = b.color || '#455a64';
      document.getElementById('be_color_hex').value = b.color || '#455a64';
      document.getElementById('be_active').value = b.active !== undefined ? b.active : 1;
      document.getElementById('be_logo_url').value = b.logo_url || '';
      document.getElementById('be_banner_url').value = b.banner_url || '';

      // Logo preview
      if (b.logo_url) {
        document.getElementById('beLogoImg').src = b.logo_url;
        document.getElementById('beLogoPreview').style.display = '';
        document.getElementById('beLogoDrop').style.display = 'none';
      } else {
        document.getElementById('beLogoPreview').style.display = 'none';
        document.getElementById('beLogoDrop').style.display = '';
      }

      // Banner preview
      if (b.banner_url) {
        document.getElementById('beBannerImg').src = b.banner_url;
        document.getElementById('beBannerPreview').style.display = '';
        document.getElementById('beBannerDrop').style.display = 'none';
      } else {
        document.getElementById('beBannerPreview').style.display = 'none';
        document.getElementById('beBannerDrop').style.display = '';
      }

      openModal('brandEditModal');
    }

    async function previewBrandImage(input, type) {
      var file = input.files[0];
      if (!file) return;

      var formData = new FormData();
      formData.append('image', file);

      var r = await fetch('/api/admin/brands/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!r.ok) { alert('Upload failed'); return; }
      var data = await r.json();

      if (type === 'logo') {
        document.getElementById('be_logo_url').value = data.image_url;
        document.getElementById('beLogoImg').src = data.image_url;
        document.getElementById('beLogoPreview').style.display = '';
        document.getElementById('beLogoDrop').style.display = 'none';
      } else {
        document.getElementById('be_banner_url').value = data.image_url;
        document.getElementById('beBannerImg').src = data.image_url;
        document.getElementById('beBannerPreview').style.display = '';
        document.getElementById('beBannerDrop').style.display = 'none';
      }
    }

    function removeBrandImage(type) {
      if (type === 'logo') {
        document.getElementById('be_logo_url').value = '';
        document.getElementById('beLogoPreview').style.display = 'none';
        document.getElementById('beLogoDrop').style.display = '';
        document.getElementById('beLogoFile').value = '';
      } else {
        document.getElementById('be_banner_url').value = '';
        document.getElementById('beBannerPreview').style.display = 'none';
        document.getElementById('beBannerDrop').style.display = '';
        document.getElementById('beBannerFile').value = '';
      }
    }

    async function saveBrandEdit(e) {
      e.preventDefault();
      var brandId = document.getElementById('be_id').value;
      var body = {
        logo_url: document.getElementById('be_logo_url').value || null,
        banner_url: document.getElementById('be_banner_url').value || null,
        tagline: document.getElementById('be_tagline').value,
        color: document.getElementById('be_color_hex').value || document.getElementById('be_color').value,
        active: parseInt(document.getElementById('be_active').value)
      };

      var r = await apiPut('/api/admin/brands/' + brandId, body);
      if (r.ok) {
        closeModal('brandEditModal');
        loadBrands();
      } else {
        var data = await r.json();
        alert(data.error || 'Error saving brand');
      }
    }
```

- [ ] **Step 6: Hook up loadBrands to tab switching**

Find the `switchTab` function in admin.html. Add a case for the brands tab:

```js
if (tab === 'brands') loadBrands();
```

- [ ] **Step 7: Add brand management CSS to admin.css**

Append to `css/admin.css`:

```css
/* ─── BRAND MANAGEMENT ───────────────────────────────────────────────────── */
.brand-mgmt-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media (min-width: 600px) { .brand-mgmt-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 900px) { .brand-mgmt-grid { grid-template-columns: repeat(4, 1fr); } }

.bmg-card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1.5px solid #e2e8f0;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.bmg-card:hover {
  border-color: #1a237e;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.bmg-logo-area { margin-bottom: 10px; }

.bmg-logo {
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 10px;
  margin: 0 auto;
  display: block;
}

.bmg-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1rem;
}

.bmg-name { font-size: 0.88rem; font-weight: 700; color: #1e293b; }
.bmg-tagline { font-size: 0.72rem; color: #64748b; margin-top: 2px; }

.bmg-status { margin-top: 8px; display: flex; gap: 4px; justify-content: center; flex-wrap: wrap; }
.bmg-badge {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #94a3b8;
}
.bmg-badge-ok { background: #dcfce7; color: #16a34a; }
.bmg-badge-warn { background: #fef3c7; color: #d97706; }

/* ─── BRAND UPLOAD ────────────────────────────────────────────────────────── */
.brand-upload-area { margin-top: 6px; }

.brand-upload-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.brand-upload-preview img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.brand-upload-preview.wide img {
  width: 160px;
  height: 80px;
}

.brand-upload-remove {
  background: none;
  border: none;
  color: #dc2626;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
}

.brand-upload-dropzone {
  padding: 16px;
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  text-align: center;
}
.brand-upload-dropzone small {
  display: block;
  color: #94a3b8;
  font-size: 0.72rem;
  margin-top: 6px;
}

.brand-upload-btn {
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.brand-upload-btn:hover { background: #0f172a; }
```

- [ ] **Step 8: Test brand management**

1. Go to admin → Brands tab
2. See all 8 brands as cards
3. Click a brand → edit modal opens
4. Upload a logo image → preview shows
5. Save → card updates with logo badge
6. Go to homepage → brand card shows uploaded logo

- [ ] **Step 9: Commit**

```bash
git add admin.html css/admin.css
git commit -m "feat: add brand management tab with logo/banner upload"
```

---

## Task 12: Admin — Brand Chips for User Access

Replace checkbox lists with visual brand chips.

**Files:**
- Modify: `admin.html` (userBrandsBody rendering function, around line 1041)
- Modify: `css/admin.css` (brand chip styles)

- [ ] **Step 1: Update the brand access rendering**

Find the code that builds the checkbox list (around line 1041-1047). Replace:

```js
      html += '<form id="userBrandsForm" onsubmit="saveUserBrands(event,' + userId + ')">';
      allBrands.forEach(function(b) {
        var checked = userBrandIds.includes(b.id) ? ' checked' : '';
        html += '<label class="checkbox-row"><input type="checkbox" name="brands" value="' + escapeHtml(b.id) + '"' + checked + '> ' + escapeHtml(b.short_name || b.name) + '</label>';
      });
      html += '<button type="submit" class="btn-admin-primary" style="width:100%;margin-top:12px">Save</button>';
      html += '</form>';
```

With:

```js
      html += '<form id="userBrandsForm" onsubmit="saveUserBrands(event,' + userId + ')">';
      html += '<div class="brand-chip-grid">';
      allBrands.forEach(function(b) {
        var isActive = userBrandIds.includes(b.id);
        html += '<label class="brand-chip' + (isActive ? ' active' : '') + '">'
          + '<input type="checkbox" name="brands" value="' + escapeHtml(b.id) + '"' + (isActive ? ' checked' : '') + ' style="display:none" onchange="this.closest(\'.brand-chip\').classList.toggle(\'active\',this.checked)">'
          + '<span class="brand-chip-dot" style="background:' + (b.color || '#455a64') + '">' + escapeHtml((b.short_name || b.name || '').substring(0, 2)) + '</span>'
          + escapeHtml(b.short_name || b.name)
          + '<span class="brand-chip-check">' + (isActive ? wfIcon('check', 'sm') : '') + '</span>'
          + '</label>';
      });
      html += '</div>';
      html += '<button type="submit" class="btn-admin-primary" style="width:100%;margin-top:12px">Save</button>';
      html += '</form>';
```

- [ ] **Step 2: Add brand chip CSS to admin.css**

Append to `css/admin.css`:

```css
/* ─── BRAND CHIPS ─────────────────────────────────────────────────────────── */
.brand-chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.brand-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px 6px 6px;
  border-radius: 8px;
  border: 1.5px solid #e2e8f0;
  background: #f8fafc;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s;
}
.brand-chip:hover { border-color: #94a3b8; }
.brand-chip.active {
  border-color: #1a237e;
  background: #eff6ff;
  color: #1a237e;
}

.brand-chip-dot {
  width: 22px;
  height: 22px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.55rem;
  font-weight: 700;
  flex-shrink: 0;
}

.brand-chip-check {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1.5px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}
.brand-chip.active .brand-chip-check {
  background: #1a237e;
  border-color: #1a237e;
  color: white;
}
```

- [ ] **Step 3: Test**

Go to admin → Users → click a user → Manage Brand Access. Verify:
- Brand chips show instead of checkboxes
- Clicking a chip toggles active state
- Save still works correctly

- [ ] **Step 4: Commit**

```bash
git add admin.html css/admin.css
git commit -m "feat: brand chips replace checkboxes for user brand access"
```

---

## Task 13: Admin CSS & Global Style Polish

Apply the updated design system to admin components (tables, buttons, stat cards) and remaining global styles.

**Files:**
- Modify: `css/admin.css` (multiple sections)
- Modify: `css/style.css` (remaining emoji references, component updates)
- Modify: `admin.html` (add font import and icons.js)

- [ ] **Step 1: Add Google Fonts to admin.html**

Add in admin.html `<head>`, after the CSS links:

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update admin base styles**

In `css/admin.css`, update the `.admin-page` rule (line 3):

```css
.admin-page {
  background: #f8fafc;
  min-height: 100vh;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
```

- [ ] **Step 3: Update admin stat cards**

Update `.stat-card` (line 81):

```css
.stat-card {
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #f1f5f9;
}
```

- [ ] **Step 4: Update admin table header**

Update `.admin-table th` (line 222):

```css
.admin-table th {
  background: #f8fafc;
  color: #334155;
  padding: 10px 8px;
  text-align: left;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
}
```

- [ ] **Step 5: Update admin buttons**

Update `.btn-admin-primary` (line 182):

```css
.btn-admin-primary {
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: background 0.15s;
}
.btn-admin-primary:hover { background: #0f172a; }
```

- [ ] **Step 6: Update product card image area CSS**

In `css/style.css`, update `.product-image` (line 238) background for no-image state:

```css
.product-image {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}
```

Remove the old `.product-emoji` rule (line 247) since we no longer use emoji.

- [ ] **Step 7: Update all form inputs with consistent styling**

In `css/admin.css`, update form input styling to use design tokens. Find the `.form-row .form-group` section and ensure all inputs/selects use:

```css
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

- [ ] **Step 8: Test admin dashboard**

Open admin panel. Verify:
- Plus Jakarta Sans renders on all text
- Stat cards have subtle shadow
- Table headers are cleaner
- Buttons are consistent
- All tabs work

- [ ] **Step 9: Commit**

```bash
git add css/admin.css css/style.css admin.html
git commit -m "style: polish admin dashboard with updated design system"
```

---

## Task 14: Homepage Cart & Orders Panel — Emoji Cleanup

Remove remaining emoji from homepage-specific cart and order panels.

**Files:**
- Modify: `index.html` (homepage cart and orders JS functions)

- [ ] **Step 1: Update homepage cart empty state**

Find the cart empty state in index.html (around line 97) and the `renderHomeCartItems` function (around line 526). Replace emoji cart icon:

In the static HTML (line 97):
```html
        <div class="cart-empty-icon"></div>
```

And in the `renderHomeCartItems` function, replace the emoji:
```js
          + '<div class="cart-empty-icon">' + wfIcon('cart', 'lg') + '</div>'
```

- [ ] **Step 2: Update homepage order panel emoji**

In the `loadMyOrders` function and `viewOrderDetail` function, remove any emoji references and ensure clean rendering.

- [ ] **Step 3: Initialize the static cart empty icon**

In the `DOMContentLoaded` handler, add:
```js
var cartEmptyIcon = document.querySelector('.cart-empty-icon');
if (cartEmptyIcon && !cartEmptyIcon.innerHTML) cartEmptyIcon.innerHTML = wfIcon('cart', 'lg');
```

- [ ] **Step 4: Test**

- Open homepage → click Cart → verify SVG icon in empty state
- Check Orders panel → no emoji visible
- Add a product to cart → verify cart works correctly

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "fix: remove remaining emoji from homepage cart and orders"
```

---

## Task 15: Final Sweep & Verification

Scan all files for remaining emoji, test all pages, verify mobile responsiveness.

**Files:**
- Potentially modify: any file with remaining emoji

- [ ] **Step 1: Search for remaining emoji in frontend files**

```bash
grep -rn "&#x1F\|&#x23\|&#x229\|&#x2630\|&#x2715\|&#x2699\|product-emoji\|pli-emoji" index.html brand.html admin.html js/app.js js/brand-config.js
```

For each hit found, replace with the appropriate `wfIcon()` call or plain text.

- [ ] **Step 2: Search for remaining HTML entity emoji in CSS**

```bash
grep -n "emoji" css/style.css css/admin.css
```

Remove any `.product-emoji` or `.pli-emoji` CSS rules — they're now replaced by `.product-icon` and `.pli-icon`.

- [ ] **Step 3: Test all pages on mobile (375px viewport)**

Open DevTools → toggle device toolbar → iPhone SE (375px):
- Login page: card fits, inputs readable
- Homepage: brand cards 2-column, search works, header nav scrolls
- Brand page: products 2-column, category tabs scroll, cart panel full-width
- Admin: tables scroll, forms stack vertically

- [ ] **Step 4: Test all pages on desktop (1440px)**

- Login: centered card
- Homepage: 4-column brand grid
- Brand page: 4+ column product grid
- Admin: full-width tables, 4-column brand management grid

- [ ] **Step 5: Test brand logo upload end-to-end**

1. Admin → Brands tab → click a brand
2. Upload a logo image → preview shows
3. Save
4. Go to homepage → verify logo shows on brand card
5. Click into brand page → verify logo shows in hero

- [ ] **Step 6: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix: final emoji cleanup and polish"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | SVG icon registry | `js/icons.js` |
| 2 | Design tokens & typography | `css/style.css`, `server/index.js` |
| 3 | Brand schema & migration | `server/db/schema.sql`, `server/db/seed.js`, `server/index.js` |
| 4 | Brand upload & update API | `server/routes/admin.js`, `server/routes/brands.js` |
| 5 | Login page refresh | `login.html` |
| 6 | Two-tier header (homepage) | `index.html`, `css/style.css` |
| 7 | Search bar & dealer selector | `index.html`, `css/style.css` |
| 8 | Full-bleed brand cards | `index.html`, `css/style.css` |
| 9 | Brand page header & tabs | `brand.html`, `js/app.js` |
| 10 | Product cards & cart emoji removal | `js/app.js`, `css/style.css` |
| 11 | Admin brands tab & modal | `admin.html`, `css/admin.css` |
| 12 | Brand chips for user access | `admin.html`, `css/admin.css` |
| 13 | Admin CSS polish | `css/admin.css`, `css/style.css`, `admin.html` |
| 14 | Homepage cart emoji cleanup | `index.html` |
| 15 | Final sweep & verification | All files |
