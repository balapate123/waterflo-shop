-- Waterflo Database Schema

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_name TEXT,
  tagline TEXT,
  color TEXT,
  unit_logic TEXT,
  price_date TEXT,
  active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS products (
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
  image_url TEXT,
  active INTEGER DEFAULT 1,
  UNIQUE(brand_id, code)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  status TEXT DEFAULT 'pending',
  discount_percent REAL DEFAULT 0,
  role TEXT DEFAULT 'dealer',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_brands (
  user_id INTEGER REFERENCES users(id),
  brand_id TEXT REFERENCES brands(id),
  PRIMARY KEY (user_id, brand_id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_no TEXT UNIQUE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  brand_id TEXT REFERENCES brands(id),
  status TEXT DEFAULT 'pending',
  total_amount REAL DEFAULT 0,
  discount_percent REAL DEFAULT 0,
  net_amount REAL DEFAULT 0,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  unit_type TEXT NOT NULL,
  unit_label TEXT NOT NULL,
  pcs_per_unit INTEGER NOT NULL,
  rate_per_unit REAL NOT NULL,
  qty INTEGER NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(brand_id, category);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_brand ON orders(brand_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- Triggers
CREATE TRIGGER IF NOT EXISTS trg_orders_updated_at
AFTER UPDATE ON orders
BEGIN
  UPDATE orders SET updated_at = datetime('now') WHERE id = NEW.id;
END;
