// Waterflo DB Seed Script
// Reads brand config + brand data JS files and seeds into SQLite

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'waterflo.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const PROJECT_ROOT = path.join(__dirname, '..', '..');

// Delete existing DB for clean seed
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
  console.log('Deleted existing database');
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Run schema
const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
db.exec(schema);
console.log('Schema created');

// Load brand-config.js to get BRANDS array
// We need to evaluate it in a sandbox-like way
const brandConfigPath = path.join(PROJECT_ROOT, 'js', 'brand-config.js');
const brandConfigCode = fs.readFileSync(brandConfigPath, 'utf8');

// Extract BRANDS array by evaluating in a controlled context
const vm = require('vm');
// brand-config.js uses `const BRANDS`, which is block-scoped in vm.
// Wrap it to capture the value.
const wrappedConfig = brandConfigCode + '\n; __BRANDS__ = BRANDS;';
const configContext = {
  __BRANDS__: null,
  URLSearchParams: class { constructor() {} get() { return null; } },
  window: { location: { search: '' } },
  console: console
};
vm.createContext(configContext);
try {
  vm.runInContext(wrappedConfig, configContext);
} catch (e) {
  console.error('Error evaluating brand-config.js:', e.message);
}

const BRANDS = configContext.__BRANDS__;
if (!BRANDS || !BRANDS.length) {
  console.error('Failed to load BRANDS from brand-config.js');
  process.exit(1);
}

console.log(`Found ${BRANDS.length} brands`);

// Insert brands
const insertBrand = db.prepare(`
  INSERT INTO brands (id, name, short_name, tagline, color, unit_logic, price_date)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

for (const b of BRANDS) {
  insertBrand.run(b.id, b.name, b.shortName, b.tagline, b.color, b.unitLogic, b.priceDate);
  console.log(`  Brand: ${b.name}`);
}

// Insert products from each brand data file
const insertProduct = db.prepare(`
  INSERT INTO products (brand_id, code, name, category, subcategory, size, size_mm, standard, rate, unit, std_pkg, qty_box, qty_bundle, rate_3mtr, rate_5mtr, pipe_length, qty_per_length, coming_soon)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((brandId, products) => {
  let count = 0;
  for (const p of products) {
    insertProduct.run(
      brandId,
      p.code,
      p.name,
      p.category || '',
      p.subcategory || '',
      p.size || '',
      p.size_mm || 0,
      p.standard || null,
      p.rate || 0,
      p.unit || 'pcs',
      p.std_pkg || 0,
      p.qty_box || 0,
      p.qty_bundle || 0,
      p.rate_3mtr || null,
      p.rate_5mtr || null,
      p.pipe_length || null,
      p.qty_per_length || null,
      p.comingSoon ? 1 : 0
    );
    count++;
  }
  return count;
});

for (const b of BRANDS) {
  const dataFilePath = path.join(PROJECT_ROOT, b.dataFile);
  if (!fs.existsSync(dataFilePath)) {
    console.log(`  SKIP ${b.id}: data file not found (${b.dataFile})`);
    continue;
  }

  const dataCode = fs.readFileSync(dataFilePath, 'utf8');
  const dataContext = { PRODUCTS: null, document: { dispatchEvent() {} }, Event: class {} };
  vm.createContext(dataContext);

  try {
    vm.runInContext(dataCode, dataContext);
  } catch (e) {
    console.error(`  ERROR loading ${b.id}: ${e.message}`);
    continue;
  }

  if (!dataContext.PRODUCTS || !dataContext.PRODUCTS.length) {
    console.log(`  SKIP ${b.id}: no PRODUCTS found`);
    continue;
  }

  const count = insertMany(b.id, dataContext.PRODUCTS);
  console.log(`  Products: ${b.id} → ${count} inserted`);
}

// Create default admin user (password: admin123)
const bcrypt = require('bcrypt');
const adminHash = bcrypt.hashSync('admin123', 10);
db.prepare(`
  INSERT INTO users (email, password_hash, company_name, contact_name, phone, status, role)
  VALUES (?, ?, ?, ?, ?, 'approved', 'admin')
`).run('admin@waterflo.in', adminHash, 'Waterflo Admin', 'Admin', '0000000000');

// Give admin access to all brands
const insertUserBrand = db.prepare('INSERT INTO user_brands (user_id, brand_id) VALUES (?, ?)');
for (const b of BRANDS) {
  insertUserBrand.run(1, b.id);
}

console.log('\nDefault admin created: admin@waterflo.in / admin123');
console.log('Seed complete!');
db.close();
