# Waterflo Distributor Ordering Platform - Implementation Plan

## Context
Waterflo currently has a single-brand static frontend for StrongFit CPVC (260 products, old prices from 01/03/2023). We need to expand it into a full multi-brand distributor ordering platform with 8 brands (~1200+ products), user authentication, admin dashboard, and order form generation. Prices need updating to w.e.f. 01/11/2025 from the 36-page PDF pricelist.

**Stack**: Node.js + Express + SQLite (better-sqlite3) | Vanilla HTML/CSS/JS frontend | Fully login-gated

---

## Phase 1: Multi-Brand Frontend + Updated Product Data [DONE]

### Step 1: Create `js/brand-config.js` [DONE]
Central registry for all 8 brands with metadata, categories, subcategory names, and unit logic type.

```
BRANDS array with objects: { id, name, shortName, tagline, icon, color,
  headerGradient, heroGradient, dataFile, priceDate, unitLogic, categories[], subcategoryNames{} }
```

Brands:
1. `strongfit-cpvc` — StrongFit CPVC (red theme, unitLogic: 'cpvc')
2. `surefit-upvc` — SureFit uPVC (blue theme, unitLogic: 'upvc-plumbing')
3. `clickfit-swr` — ClickFit uPVC SWR (green theme, unitLogic: 'swr')
4. `upvc-swr` — uPVC SWR System (olive theme, unitLogic: 'swr')
5. `selfit` — SelFit uPVC SWR (teal theme, unitLogic: 'swr')
6. `ugd` — UGD Drainage Pipes (brown/red theme, unitLogic: 'ugd')
7. `agrimaster` — AgriMaster Agriculture (green theme, unitLogic: 'agriculture')
8. `boreline` — Boreline Column Pipes (blue/teal theme, unitLogic: 'boreline')

### Step 2: Create/update 8 brand data files under `js/brands/` [DONE]
Each file defines a `PRODUCTS` array and dispatches `brand-data-ready` event.

| File | Source Pages | Est. Products | Status |
|------|------------|--------------|--------|
| `strongfit-cpvc.js` | PDF pg 3-8 | ~260 | DONE (migrated from data.js, old prices) |
| `surefit-upvc.js` | PDF pg 9-14 | ~200 | Placeholder (~14 products) |
| `clickfit-swr.js` | PDF pg 14-16 | ~60 | Placeholder (~12 products) |
| `upvc-swr.js` | PDF pg 17-18 | ~40 | Placeholder (~9 products) |
| `selfit.js` | PDF pg 18-21 | ~120 | Placeholder (~11 products) |
| `ugd.js` | PDF pg 22-23 | ~40 | Placeholder (~10 products) |
| `agrimaster.js` | PDF pg 23-31 | ~500+ | Placeholder (~22 products) |
| `boreline.js` | PDF pg 32-33 | ~80 | Placeholder (~14 products) |

**TODO**: Extract full product data from 36-page PDF pricelist (w.e.f. 01/11/2025) and replace all placeholder files.

### Step 3: Create brand landing page (`index.html`) [DONE]
- Waterflo header/logo
- 8 brand cards in responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- Each card: brand icon, name, tagline, color-coded border
- Click navigates to `brand.html?brand={id}`

### Step 4: Create `brand.html` (from current `index.html`) [DONE]
- "Back to Brands" arrow button in header
- Dynamic hero banner (brand name, tagline, price date)
- Dynamic script loading: `brand-config.js` → `app.js` → brand data file
- Brand data loaded via URL param: `?brand=strongfit-cpvc`

### Step 5: Refactor `app.js` for multi-brand [DONE]
Key changes to `js/app.js`:
- **Init**: Wait for `brand-data-ready` event, read active brand from `window.activeBrand`
- **Categories/Subcategories**: Use `activeBrand.categories` and `activeBrand.subcategoryNames`
- **Unit logic**: Generalized `getUnitOpts()` with switch on `activeBrand.unitLogic`:
  - `cpvc` / `upvc-plumbing`: Current bundle/pkg/box logic
  - `swr`: Pipes sold per piece (3m/6m length), fittings per piece with std_pkg/box
  - `agriculture`: Pipes per 6m length, fittings with pkg/box
  - `boreline`: Column pipes per unit by series
  - `ugd`: Pipes per piece (3m/6m)
- **Cart**: Added `brandId` field to cart items, cart key = `brandId_code_unitType`
- **Cart display**: Group items by brand with colored headers
- **Brand theming**: Apply brand colors to hero, header accent, data-brand attribute
- **Quantity selector on cards**: +/- input next to "Add to Cart" button

### Step 6: Update `css/style.css` [DONE]
- Brand landing page styles (`.brand-grid`, `.brand-card`, `.landing-hero`)
- Back button styles (`.back-btn`)
- Card quantity selector styles (`.qty-inline`, `.card-qty-input`, `.qi-btn`)
- Cart brand header styles (`.cart-brand-header`, `.cart-brand-dot`)
- Fabricated category color (`.cat-fabricated`)

### Files Created/Modified (Phase 1):
```
MODIFIED:  index.html → brand landing page
CREATED:   brand.html (product browsing page, adapted from old index.html)
MODIFIED:  css/style.css (added brand landing + theme + qty selector styles)
CREATED:   js/brand-config.js
CREATED:   js/brands/strongfit-cpvc.js (migrated from data.js)
CREATED:   js/brands/surefit-upvc.js (placeholder)
CREATED:   js/brands/clickfit-swr.js (placeholder)
CREATED:   js/brands/upvc-swr.js (placeholder)
CREATED:   js/brands/selfit.js (placeholder)
CREATED:   js/brands/ugd.js (placeholder)
CREATED:   js/brands/agrimaster.js (placeholder)
CREATED:   js/brands/boreline.js (placeholder)
MODIFIED:  js/app.js (multi-brand refactor v4 + qty selector)
KEPT:      js/data.js (legacy, no longer loaded by app)
```

### Brand Loading Sequence (fixed):
1. `brand.html` inline script loads `brand-config.js` (static `<script>` tag)
2. Sets `window.activeBrand` from URL param
3. Dynamically loads `app.js` first (registers `brand-data-ready` listener)
4. On `app.js` load, dynamically loads brand data file (e.g. `strongfit-cpvc.js`)
5. Brand data file dispatches `brand-data-ready` event
6. `app.js` `init()` runs, reads `window.activeBrand`, renders everything

---

## Phase 1.5: Full Product Data Extraction [DEFERRED → Admin Dashboard]

### PDF Price List Processing
- Source: 36-page Waterflo PDF pricelist w.e.f. 01/11/2025
- Need to extract all products for all 8 brands with correct:
  - Product codes, names, sizes, size_mm
  - Rates (per mtr for pipes, per pcs for fittings)
  - std_pkg, qty_box, qty_bundle quantities
  - Subcategory assignments
  - Standards (IS/ASTM numbers)

### Brand-by-brand extraction:
1. **StrongFit CPVC** (pg 3-8): Update existing 260 products with new prices
2. **SureFit uPVC** (pg 9-14): ~200 products - full extraction needed
3. **ClickFit SWR** (pg 14-16): ~60 products - push-fit SWR pipes + fittings
4. **uPVC SWR** (pg 17-18): ~40 products - SWR 2.5kg pipes + LW fittings
5. **SelFit** (pg 18-21): ~120 products - SelFit pipes + fittings + common SWR
6. **UGD** (pg 22-23): ~40 products - UGD pipes (SN2/SN4/SN8)
7. **AgriMaster** (pg 23-31): ~500+ products - Largest: agri pipes + fittings + fabricated
8. **Boreline** (pg 32-33): ~80 products - Column pipes by series

---

## Phase 2: Backend + Authentication [DONE]

### Setup
- `package.json` with: express, better-sqlite3, express-session, bcrypt, connect-sqlite3
- `server/index.js` — Express server serving static files from project root
- `server/db/schema.sql` — Tables: brands, categories, subcategories, products, users, user_brands, orders, order_items, sessions
- `server/db/seed.js` — Seed all product data from brand JS files into SQLite

### Database Schema
```sql
-- Brands
CREATE TABLE brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  tagline TEXT,
  color TEXT,
  unit_logic TEXT,
  price_date TEXT,
  active INTEGER DEFAULT 1
);

-- Products
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand_id TEXT NOT NULL REFERENCES brands(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  size TEXT NOT NULL,
  size_mm REAL DEFAULT 0,
  standard TEXT,
  rate REAL DEFAULT 0,
  unit TEXT DEFAULT 'pcs',
  std_pkg INTEGER DEFAULT 0,
  qty_box INTEGER DEFAULT 0,
  qty_bundle INTEGER DEFAULT 0,
  rate_3mtr REAL,
  rate_5mtr REAL,
  pipe_length REAL,
  qty_per_length INTEGER,
  coming_soon INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1,
  UNIQUE(brand_id, code)
);

-- Users
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, suspended
  discount_percent REAL DEFAULT 0,
  role TEXT DEFAULT 'dealer', -- dealer, admin
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User-Brand Access
CREATE TABLE user_brands (
  user_id INTEGER REFERENCES users(id),
  brand_id TEXT REFERENCES brands(id),
  PRIMARY KEY (user_id, brand_id)
);

-- Orders
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  brand_id TEXT REFERENCES brands(id),
  status TEXT DEFAULT 'pending', -- pending, confirmed, dispatched, delivered, cancelled
  total_amount REAL DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  unit_type TEXT NOT NULL,
  unit_label TEXT NOT NULL,
  pcs_per_unit INTEGER NOT NULL,
  rate_per_unit REAL NOT NULL,
  qty INTEGER NOT NULL
);
```

### Auth Flow
- `login.html` — Login form + registration form (tabs)
- Registration: company name, contact name, phone, email, password, address
- Status workflow: pending → admin approves → approved (can login)
- Session-based auth with express-session + SQLite session store
- Auth middleware checks session on all /api/* routes

### API Routes
```
POST /api/auth/register        — Register new dealer
POST /api/auth/login           — Login (returns session)
POST /api/auth/logout          — Logout (destroys session)
GET  /api/auth/me              — Get current user info

GET  /api/brands               — List brands (filtered by user's brand access)
GET  /api/brands/:id/products  — Get products for a brand (?category=&size=&search=)

POST /api/orders               — Create order from cart
GET  /api/orders               — List user's order history
GET  /api/orders/:id           — Get order details
```

### Frontend Changes for Auth
- Add auth check on page load → redirect to `login.html` if not authenticated
- Fetch products from API instead of static JS files
- Submit orders to API instead of just showing success screen
- Show only brands the user has access to on landing page
- Apply user's discount to displayed prices (if applicable)
- Show order history page/section

### Server File Structure
```
server/
  index.js              — Express server entry point
  db/
    schema.sql          — Database schema
    seed.js             — Seed script (reads brand JS files → inserts into SQLite)
    waterflo.db         — SQLite database (gitignored)
  routes/
    auth.js             — Auth routes (register, login, logout, me)
    brands.js           — Brand & product routes
    orders.js           — Order routes
  middleware/
    auth.js             — requireAuth, requireAdmin middleware
login.html              — Login/register page
```

---

## Phase 3: Admin Dashboard [DONE]

### `admin.html` — Single-page admin dashboard with tabs:

#### Tab 1: Dashboard
- Total orders count, today's orders, pending orders
- Revenue stats (daily, weekly, monthly)
- Pending registrations count (badge)
- Recent orders list (last 10)
- Quick links to common actions

#### Tab 2: Users
- Table: company, contact, phone, email, status, discount%, brands, actions
- Filter by status (pending/approved/suspended)
- Actions: Approve, Suspend, Set discount %, Manage brand access
- Click to expand user details
- Bulk approve pending registrations

#### Tab 3: Orders
- Table: order no, date, dealer, brand, items, total, status
- Filter by: status, brand, date range, dealer
- Click to view order details (items, quantities, amounts)
- Update order status (pending → confirmed → dispatched → delivered)
- Generate printable order form (see below)
- Export orders to CSV

#### Tab 4: Products
- Browse products by brand and category
- Edit product details (name, rate, std_pkg, qty_box, etc.)
- Bulk price update: upload CSV or % increase/decrease
- Add new products
- Deactivate/activate products
- Photo upload for products (future)

#### Tab 5: Order Forms
- Generate printable order forms matching physical format per brand
- Brand-specific HTML templates for print (landscape grids)
- Pre-fill with order data or generate blank forms

### Order Form Templates (Print-Optimized)
Brand-specific HTML templates designed for landscape printing, matching physical order forms:

1. **StrongFit CPVC Order Form**:
   - Grid layout: Fitting types (rows) × Sizes (columns: ½" to 6")
   - Sections: SDR 11 Fittings, SCH 80 Fittings, Reducers, Brass, Pipes
   - Each cell: qty input field
   - Header: Dealer info, date, order number

2. **SureFit uPVC Order Form**:
   - Similar grid layout for uPVC fittings
   - Sections by fitting category

3. **SWR Order Forms** (ClickFit, SelFit, uPVC SWR):
   - Multiple tables: Push-fit fittings, Common SWR fittings
   - Sizes: 75mm, 110mm, 160mm columns

4. **AgriMaster Order Form**:
   - Multi-section layout by fitting category
   - Pipes section: Size × Class grid
   - Fittings: Moulded + Fabricated sections

5. **Boreline/UGD Order Forms**:
   - Size × Series/Class grids
   - Simpler layouts (fewer product types)

### Admin API Routes
```
GET    /api/admin/dashboard      — Dashboard stats
GET    /api/admin/users          — List all users
PUT    /api/admin/users/:id      — Update user (status, discount, role)
PUT    /api/admin/users/:id/brands — Update user's brand access
GET    /api/admin/orders         — List all orders (with filters)
PUT    /api/admin/orders/:id     — Update order status
GET    /api/admin/products       — List products (with brand filter)
PUT    /api/admin/products/:id   — Update product
POST   /api/admin/products       — Add product
POST   /api/admin/products/bulk-price — Bulk price update
GET    /api/admin/order-form/:brandId — Generate order form template
```

---

## Verification Checklist

### Phase 1 Verification [MOSTLY DONE]
- [x] Open `index.html` — see 8 brand cards
- [x] Click each brand → navigates to `brand.html?brand=X`
- [x] Each brand page loads correct products with proper categories/filters
- [ ] Size filter works correctly (test `"` encoding in size values)
- [x] Unit picker shows correct options per brand's unit logic
- [x] Quantity selector on product cards allows setting qty before adding
- [x] Cart works, items tagged with brandId
- [ ] Cart groups items by brand when items from multiple brands exist
- [ ] Quote modal shows brand name and correct pricing
- [x] Grid/List view toggle works for all brands
- [ ] Test on mobile viewport (375px) — responsive layout works

### Phase 2 Verification [DONE]
- [x] Server starts and serves static files
- [x] Registration form works, creates pending user
- [ ] Admin can approve user (needs admin dashboard — Phase 3)
- [x] Approved user can login
- [x] Login redirects to brand landing page
- [x] Non-authenticated users redirected to login (302 → /login.html)
- [x] Products load from static JS files (API available at /api/brands/:id/products)
- [x] Orders save to database via API
- [x] Order history API works (/api/orders)
- [x] User sees only their approved brands via API

### Phase 3 Verification [DONE]
- [x] Admin dashboard shows correct stats (orders, users, products, revenue, brand overview)
- [x] User management (approve, suspend, reactivate, set discount%, manage brand access)
- [x] Order management (view details, change status: pending/confirmed/dispatched/delivered/cancelled)
- [x] Product management (add, edit, deactivate, bulk price update by brand/category/%)
- [ ] Order form generation (per brand, print-optimized) — deferred to future
- [x] All admin actions require admin role (requireAdmin middleware)

---

## Technical Notes

### Cart Storage
- Cart stored in localStorage as `wf_cart`
- Cart items include `brandId` field for cross-brand support
- Cart key format: `brandId_code_unitType`
- v4 migration: old carts without `cartKey` are cleared

### Brand Data File Contract
Each brand data file (`js/brands/*.js`) must:
1. Declare `var PRODUCTS = [...]` (using `var` not `const` for global scope)
2. Dispatch `document.dispatchEvent(new Event('brand-data-ready'))` at the end
3. Product objects must have at minimum: `code, name, category, subcategory, size, size_mm, rate, unit`
4. Pipes must have: `qty_bundle` (for cpvc/upvc) or `qty_per_length, pipe_length` (for swr/agri/ugd/boreline)
5. Fittings must have: `std_pkg, qty_box`

### Script Loading Order (brand.html)
1. `brand-config.js` — static `<script>` tag
2. Inline script sets `window.activeBrand`
3. `app.js` — dynamically loaded, registers `brand-data-ready` listener
4. Brand data file — loaded in `app.js` onload callback, dispatches event
5. `init()` — runs when event fires
