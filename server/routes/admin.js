const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { requireAdmin } = require('../middleware/auth');
const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads', 'products'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = 'prod_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8) + ext;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  }
});

// All routes require admin
router.use(requireAdmin);

// ─── DASHBOARD STATS ────────────────────────────────────────────────────────

router.get('/dashboard', (req, res) => {
  const db = req.app.get('db');

  const totalOrders = db.prepare('SELECT COUNT(*) as c FROM orders').get().c;
  const todayOrders = db.prepare("SELECT COUNT(*) as c FROM orders WHERE date(created_at) = date('now')").get().c;
  const pendingOrders = db.prepare("SELECT COUNT(*) as c FROM orders WHERE status = 'pending'").get().c;
  const confirmedOrders = db.prepare("SELECT COUNT(*) as c FROM orders WHERE status = 'confirmed'").get().c;

  const totalRevenue = db.prepare('SELECT COALESCE(SUM(total_amount), 0) as t FROM orders').get().t;
  const pendingRevenue = db.prepare("SELECT COALESCE(SUM(total_amount), 0) as t FROM orders WHERE status = 'pending'").get().t;

  const totalUsers = db.prepare('SELECT COUNT(*) as c FROM users').get().c;
  const pendingUsers = db.prepare("SELECT COUNT(*) as c FROM users WHERE status = 'pending'").get().c;
  const totalProducts = db.prepare('SELECT COUNT(*) as c FROM products WHERE active = 1').get().c;

  const recentOrders = db.prepare(`
    SELECT o.id, o.order_no, o.status, o.total_amount, o.created_at,
           u.company_name, u.contact_name, b.short_name as brand_name
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN brands b ON o.brand_id = b.id
    ORDER BY o.created_at DESC LIMIT 10
  `).all();

  const brandStats = db.prepare(`
    SELECT b.id, b.short_name as name, b.color,
           COUNT(DISTINCT p.id) as product_count,
           COUNT(DISTINCT o.id) as order_count
    FROM brands b
    LEFT JOIN products p ON b.id = p.brand_id AND p.active = 1
    LEFT JOIN orders o ON b.id = o.brand_id
    WHERE b.active = 1
    GROUP BY b.id
    ORDER BY b.name
  `).all();

  res.json({
    totalOrders, todayOrders, pendingOrders, confirmedOrders,
    totalRevenue, pendingRevenue,
    totalUsers, pendingUsers, totalProducts,
    recentOrders, brandStats
  });
});

// ─── USERS ──────────────────────────────────────────────────────────────────

router.get('/users', (req, res) => {
  const db = req.app.get('db');
  const { status } = req.query;

  let query = `
    SELECT u.id, u.email, u.company_name, u.contact_name, u.phone, u.address,
           u.status, u.discount_percent, u.role, u.created_at
    FROM users u
  `;
  const params = [];

  if (status) {
    query += ' WHERE u.status = ?';
    params.push(status);
  }

  query += ' ORDER BY u.created_at DESC';

  const users = db.prepare(query).all(...params);

  // Get brand access and category discount count for each user
  for (const user of users) {
    user.brands = db.prepare(`
      SELECT b.id, b.short_name as name FROM user_brands ub
      JOIN brands b ON ub.brand_id = b.id
      WHERE ub.user_id = ?
    `).all(user.id);
    user.category_discount_count = db.prepare(
      'SELECT COUNT(*) as c FROM user_category_discounts WHERE user_id = ?'
    ).get(user.id).c;
  }

  res.json({ users });
});

router.put('/users/:id', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;
  const { status, discount_percent, role, company_name, contact_name, phone, email, address } = req.body;

  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const updates = [];
  const params = [];

  if (status !== undefined) {
    const validStatuses = ['pending', 'approved', 'suspended'];
    if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    updates.push('status = ?'); params.push(status);
  }
  if (discount_percent !== undefined) {
    if (typeof discount_percent !== 'number' || discount_percent < 0 || discount_percent > 100) {
      return res.status(400).json({ error: 'Discount must be between 0 and 100' });
    }
    updates.push('discount_percent = ?'); params.push(discount_percent);
  }
  if (role !== undefined) {
    const validRoles = ['dealer', 'admin', 'salesman'];
    if (!validRoles.includes(role)) return res.status(400).json({ error: 'Invalid role' });
    updates.push('role = ?'); params.push(role);
  }
  if (company_name !== undefined) { updates.push('company_name = ?'); params.push(company_name.trim()); }
  if (contact_name !== undefined) { updates.push('contact_name = ?'); params.push(contact_name.trim()); }
  if (phone !== undefined) { updates.push('phone = ?'); params.push(phone.trim()); }
  if (email !== undefined) { updates.push('email = ?'); params.push(email.toLowerCase().trim()); }
  if (address !== undefined) { updates.push('address = ?'); params.push(address.trim()); }

  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

  params.push(userId);
  db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  res.json({ message: 'User updated' });
});

// GET /api/admin/users/:id/orders — get all orders for a user
router.get('/users/:id/orders', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;

  const user = db.prepare('SELECT id, company_name, contact_name, phone, email, address, discount_percent FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const orders = db.prepare(`
    SELECT o.*, b.name as brand_name, b.short_name as brand_short_name, b.color as brand_color
    FROM orders o
    LEFT JOIN brands b ON o.brand_id = b.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `).all(userId);

  // Get items for each order
  const getItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
  for (const order of orders) {
    order.items = getItems.all(order.id);
  }

  res.json({ user, orders });
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;

  const user = db.prepare('SELECT id, role FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (user.role === 'admin') return res.status(400).json({ error: 'Cannot delete admin users' });

  const deleteUser = db.transaction(() => {
    // Delete order items for user's orders
    db.prepare('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = ?)').run(userId);
    // Delete orders
    db.prepare('DELETE FROM orders WHERE user_id = ?').run(userId);
    // Delete brand access
    db.prepare('DELETE FROM user_brands WHERE user_id = ?').run(userId);
    // Delete salesman-dealer links (as either side)
    db.prepare('DELETE FROM salesman_dealers WHERE salesman_id = ? OR dealer_id = ?').run(userId, userId);
    // Delete user
    db.prepare('DELETE FROM users WHERE id = ?').run(userId);
  });

  deleteUser();
  res.json({ message: 'User deleted' });
});

router.put('/users/:id/brands', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;
  const { brand_ids } = req.body;

  if (!Array.isArray(brand_ids)) return res.status(400).json({ error: 'brand_ids must be an array' });

  db.prepare('DELETE FROM user_brands WHERE user_id = ?').run(userId);

  const insert = db.prepare('INSERT INTO user_brands (user_id, brand_id) VALUES (?, ?)');
  const insertAll = db.transaction((brands) => {
    for (const bid of brands) {
      insert.run(userId, bid);
    }
  });
  insertAll(brand_ids);

  res.json({ message: 'Brand access updated' });
});

// GET /api/admin/users/:id/dealers — get dealers linked to a salesman
router.get('/users/:id/dealers', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;

  const user = db.prepare('SELECT id, role FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Get currently linked dealers
  const linked = db.prepare(`
    SELECT u.id, u.company_name, u.contact_name, u.phone, u.email
    FROM salesman_dealers sd
    JOIN users u ON sd.dealer_id = u.id
    WHERE sd.salesman_id = ?
    ORDER BY u.company_name
  `).all(userId);

  // Get all approved dealers (for picker)
  const allDealers = db.prepare(`
    SELECT id, company_name, contact_name, phone, email
    FROM users
    WHERE role = 'dealer' AND status = 'approved'
    ORDER BY company_name
  `).all();

  const linkedIds = new Set(linked.map(d => d.id));

  res.json({
    linked,
    all_dealers: allDealers.map(d => ({ ...d, linked: linkedIds.has(d.id) }))
  });
});

// PUT /api/admin/users/:id/dealers — set dealers for a salesman
router.put('/users/:id/dealers', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;
  const { dealer_ids } = req.body;

  if (!Array.isArray(dealer_ids)) return res.status(400).json({ error: 'dealer_ids must be an array' });

  const user = db.prepare('SELECT id, role FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  db.prepare('DELETE FROM salesman_dealers WHERE salesman_id = ?').run(userId);

  const insert = db.prepare('INSERT INTO salesman_dealers (salesman_id, dealer_id) VALUES (?, ?)');
  const insertAll = db.transaction((ids) => {
    for (const did of ids) {
      insert.run(userId, did);
    }
  });
  insertAll(dealer_ids);

  res.json({ message: 'Dealer links updated' });
});

// ─── CATEGORY DISCOUNTS ──────────────────────────────────────────────────────

// Default trade discounts (from Godavari Trade Discount Revision 10-03-2026)
const DEFAULT_CATEGORY_DISCOUNTS = [
  { category: 'CPVC Pipes',          discount_percent: 59.90 },
  { category: 'CPVC Fittings',       discount_percent: 55.90 },
  { category: 'CPVC Brass Fittings', discount_percent: 50.40 },
  { category: 'uPVC Pipes',          discount_percent: 55.70 },
  { category: 'uPVC Fittings',       discount_percent: 57.05 },
  { category: 'uPVC Ball Valves',    discount_percent: 54.55 },
  { category: 'uPVC Brass Fittings', discount_percent: 47.95 },
  { category: 'SWR Pipes',           discount_percent: 55.85 },
  { category: 'SWR Fittings',        discount_percent: 57.60 },
  { category: 'UGD Pipes',           discount_percent: 55.85 },
  { category: 'PVC Pipes',           discount_percent: 53.75 },
  { category: 'PVC Fittings',        discount_percent: 56.00 },
  { category: 'PVC Ball Valves',     discount_percent: 53.45 },
  { category: 'PVC Brass Fittings',  discount_percent: 49.10 },
  { category: 'Column Pipes',        discount_percent: 53.75 },
  { category: 'CPVC / uPVC Solvent', discount_percent: 51.00 },
  { category: 'PVC / SWR Solvent',   discount_percent: 47.60 },
];

// GET /api/admin/users/:id/discounts — get per-category discounts for a user
router.get('/users/:id/discounts', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;

  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const saved = db.prepare('SELECT category, discount_percent FROM user_category_discounts WHERE user_id = ?').all(userId);
  const savedMap = {};
  for (const s of saved) savedMap[s.category] = s.discount_percent;

  // Merge defaults with user-specific overrides
  const discounts = DEFAULT_CATEGORY_DISCOUNTS.map(d => ({
    category: d.category,
    default_percent: d.discount_percent,
    discount_percent: savedMap[d.category] !== undefined ? savedMap[d.category] : d.discount_percent
  }));

  res.json({ discounts, defaults: DEFAULT_CATEGORY_DISCOUNTS });
});

// PUT /api/admin/users/:id/discounts — save per-category discounts for a user
router.put('/users/:id/discounts', (req, res) => {
  const db = req.app.get('db');
  const userId = req.params.id;
  const { discounts } = req.body;

  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!Array.isArray(discounts) || discounts.length === 0) {
    return res.status(400).json({ error: 'discounts must be a non-empty array' });
  }

  for (const d of discounts) {
    if (!d.category || typeof d.category !== 'string') {
      return res.status(400).json({ error: 'Each discount must have a category string' });
    }
    if (typeof d.discount_percent !== 'number' || d.discount_percent < 0 || d.discount_percent > 100) {
      return res.status(400).json({ error: `discount_percent must be between 0 and 100 for "${d.category}"` });
    }
  }

  const upsert = db.prepare(`
    INSERT INTO user_category_discounts (user_id, category, discount_percent)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, category) DO UPDATE SET discount_percent = excluded.discount_percent
  `);

  const saveAll = db.transaction((items) => {
    for (const d of items) {
      upsert.run(userId, d.category, d.discount_percent);
    }
  });

  saveAll(discounts);
  res.json({ message: 'Category discounts updated', count: discounts.length });
});



router.get('/orders', (req, res) => {
  const db = req.app.get('db');
  const { status, brand_id, date_from, date_to } = req.query;

  let query = `
    SELECT o.*, u.company_name, u.contact_name, u.phone,
           b.name as brand_name, b.short_name as brand_short_name, b.color as brand_color,
           sm.company_name as salesman_company, sm.contact_name as salesman_name
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN brands b ON o.brand_id = b.id
    LEFT JOIN users sm ON o.placed_by_salesman_id = sm.id
    WHERE 1=1
  `;
  const params = [];

  if (status) { query += ' AND o.status = ?'; params.push(status); }
  if (brand_id) { query += ' AND o.brand_id = ?'; params.push(brand_id); }
  if (date_from) { query += ' AND date(o.created_at) >= ?'; params.push(date_from); }
  if (date_to) { query += ' AND date(o.created_at) <= ?'; params.push(date_to); }

  query += ' ORDER BY o.created_at DESC';

  const orders = db.prepare(query).all(...params);
  res.json({ orders });
});

router.get('/orders/:id', (req, res) => {
  const db = req.app.get('db');

  const order = db.prepare(`
    SELECT o.*, u.company_name, u.contact_name, u.phone, u.email, u.address,
           u.discount_percent as user_discount_percent,
           b.name as brand_name, b.short_name as brand_short_name, b.price_date as brand_price_date,
           sm.company_name as salesman_company, sm.contact_name as salesman_name, sm.phone as salesman_phone
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    LEFT JOIN brands b ON o.brand_id = b.id
    LEFT JOIN users sm ON o.placed_by_salesman_id = sm.id
    WHERE o.id = ?
  `).get(req.params.id);

  if (!order) return res.status(404).json({ error: 'Order not found' });

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

  res.json({ order, items });
});

router.put('/orders/:id', (req, res) => {
  const db = req.app.get('db');
  const { status } = req.body;

  if (!status) return res.status(400).json({ error: 'Status required' });

  const validStatuses = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) return res.status(400).json({ error: 'Invalid status' });

  const result = db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Order not found' });

  res.json({ message: 'Order status updated' });
});

// PUT /api/admin/orders/:id/edit — edit order items (admin)
router.put('/orders/:id/edit', (req, res) => {
  const db = req.app.get('db');
  const orderId = req.params.id;
  const { items, notes } = req.body;

  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  if (!items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Order must have at least one item' });
  }

  // Validate each item
  for (const item of items) {
    if (!item.code || !item.name || !item.size) {
      return res.status(400).json({ error: 'Each item must have code, name, and size' });
    }
    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }
    if (typeof item.rate_per_unit !== 'number' || item.rate_per_unit < 0) {
      return res.status(400).json({ error: 'Rate per unit must be a non-negative number' });
    }
    if (!Number.isInteger(item.pcs_per_unit) || item.pcs_per_unit <= 0) {
      return res.status(400).json({ error: 'Pieces per unit must be a positive integer' });
    }
  }

  // Calculate new totals
  let totalAmount = 0;
  for (const item of items) {
    totalAmount += (item.rate_per_unit || 0) * (item.qty || 0);
  }
  const discPct = order.discount_percent || 0;
  const discountAmt = discPct > 0 ? Math.round(totalAmount * discPct / 100 * 100) / 100 : 0;
  const netAmount = totalAmount - discountAmt;

  try {
    const editOrder = db.transaction(() => {
      // Delete existing items
      db.prepare('DELETE FROM order_items WHERE order_id = ?').run(orderId);

      // Insert updated items
      const insertItem = db.prepare(`
        INSERT INTO order_items (order_id, product_id, code, name, size, unit_type, unit_label, pcs_per_unit, rate_per_unit, qty)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      for (const item of items) {
        insertItem.run(
          orderId,
          item.product_id || null,
          item.code,
          item.name,
          item.size,
          item.unit_type || '',
          item.unit_label || '',
          item.pcs_per_unit,
          item.rate_per_unit,
          item.qty
        );
      }

      // Update order totals and notes
      db.prepare(`
        UPDATE orders SET total_amount = ?, net_amount = ?, notes = ? WHERE id = ?
      `).run(totalAmount, netAmount, notes !== undefined ? notes : order.notes, orderId);
    });

    editOrder();
    res.json({ message: 'Order updated', total_amount: totalAmount, net_amount: netAmount });
  } catch (err) {
    console.error('Order edit error:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

router.get('/products', (req, res) => {
  const db = req.app.get('db');
  const { brand_id, category, search, active } = req.query;

  let query = 'SELECT p.*, b.short_name as brand_name FROM products p LEFT JOIN brands b ON p.brand_id = b.id WHERE 1=1';
  const params = [];

  if (brand_id) { query += ' AND p.brand_id = ?'; params.push(brand_id); }
  if (category && category !== 'all') { query += ' AND p.category = ?'; params.push(category); }
  if (active !== undefined) { query += ' AND p.active = ?'; params.push(active === 'true' ? 1 : 0); }
  if (search) {
    query += ' AND (p.name LIKE ? OR p.code LIKE ? OR p.size LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  query += ' ORDER BY p.brand_id, p.category, p.subcategory, p.size_mm, p.code';

  const products = db.prepare(query).all(...params);
  res.json({ products });
});

// Image upload endpoint
router.post('/products/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No valid image file uploaded (jpg, png, webp, max 2MB)' });
  res.json({ image_url: '/uploads/products/' + req.file.filename });
});

// Delete old image helper
function deleteOldImage(imageUrl) {
  if (!imageUrl) return;
  const filePath = path.join(__dirname, '..', '..', imageUrl);
  fs.unlink(filePath, () => {}); // ignore errors
}

router.post('/products', (req, res) => {
  const db = req.app.get('db');
  const p = req.body;

  if (!p.brand_id || !p.code || !p.name || !p.category || !p.subcategory || !p.size) {
    return res.status(400).json({ error: 'Missing required fields: brand_id, code, name, category, subcategory, size' });
  }

  // Check for duplicate code within brand
  const existing = db.prepare('SELECT id FROM products WHERE brand_id = ? AND code = ?').get(p.brand_id, p.code);
  if (existing) return res.status(409).json({ error: 'Product code already exists for this brand' });

  const result = db.prepare(`
    INSERT INTO products (brand_id, code, name, category, subcategory, size, size_mm, standard, rate, unit, std_pkg, qty_box, qty_bundle, rate_3mtr, rate_5mtr, pipe_length, qty_per_length, coming_soon, image_url, active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
  `).run(
    p.brand_id, p.code, p.name, p.category, p.subcategory, p.size,
    p.size_mm || 0, p.standard || null, p.rate || 0, p.unit || 'pcs',
    p.std_pkg || 0, p.qty_box || 0, p.qty_bundle || 0,
    p.rate_3mtr || null, p.rate_5mtr || null, p.pipe_length || null,
    p.qty_per_length || null, p.coming_soon ? 1 : 0, p.image_url || null
  );

  res.status(201).json({ message: 'Product created', id: result.lastInsertRowid });
});

router.put('/products/:id', (req, res) => {
  const db = req.app.get('db');
  const p = req.body;
  const productId = req.params.id;

  const existing = db.prepare('SELECT id, brand_id FROM products WHERE id = ?').get(productId);
  if (!existing) return res.status(404).json({ error: 'Product not found' });

  // Check for duplicate code within brand (exclude own ID)
  if (p.code !== undefined) {
    const duplicate = db.prepare('SELECT id FROM products WHERE brand_id = ? AND code = ? AND id != ?').get(existing.brand_id, p.code, productId);
    if (duplicate) return res.status(409).json({ error: 'Product code already exists for this brand' });
  }

  const fields = ['code', 'name', 'category', 'subcategory', 'size', 'size_mm', 'standard',
    'rate', 'unit', 'std_pkg', 'qty_box', 'qty_bundle', 'rate_3mtr', 'rate_5mtr',
    'pipe_length', 'qty_per_length', 'coming_soon', 'active', 'image_url'];

  const updates = [];
  const params = [];

  for (const f of fields) {
    if (p[f] !== undefined) {
      updates.push(`${f} = ?`);
      params.push(p[f]);
    }
  }

  if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

  params.push(productId);
  db.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`).run(...params);

  res.json({ message: 'Product updated' });
});

router.delete('/products/:id', (req, res) => {
  const db = req.app.get('db');
  // Soft delete — set active = 0
  const result = db.prepare('UPDATE products SET active = 0 WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deactivated' });
});

router.post('/products/bulk-price', (req, res) => {
  const db = req.app.get('db');
  const { brand_id, percent_change, category } = req.body;

  if (!brand_id || percent_change === undefined) {
    return res.status(400).json({ error: 'brand_id and percent_change required' });
  }

  if (typeof percent_change !== 'number' || percent_change < -50 || percent_change > 50) {
    return res.status(400).json({ error: 'Price change must be between -50% and +50%' });
  }

  const factor = 1 + (percent_change / 100);

  let query = 'UPDATE products SET rate = ROUND(rate * ?, 2)';
  const params = [factor];

  // Also update rate_3mtr and rate_5mtr if they exist
  query += ', rate_3mtr = CASE WHEN rate_3mtr IS NOT NULL THEN ROUND(rate_3mtr * ?, 2) ELSE NULL END';
  params.push(factor);
  query += ', rate_5mtr = CASE WHEN rate_5mtr IS NOT NULL THEN ROUND(rate_5mtr * ?, 2) ELSE NULL END';
  params.push(factor);

  query += ' WHERE brand_id = ? AND active = 1';
  params.push(brand_id);

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  const result = db.prepare(query).run(...params);
  res.json({ message: `Updated ${result.changes} products by ${percent_change}%` });
});

// ─── BRANDS (for admin selectors) ───────────────────────────────────────────

router.get('/brands', (req, res) => {
  const db = req.app.get('db');
  const brands = db.prepare('SELECT * FROM brands ORDER BY name').all();
  res.json({ brands });
});

// ─── SETTINGS ────────────────────────────────────────────────────────────────

router.get('/settings', (req, res) => {
  const db = req.app.get('db');
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  for (const row of rows) {
    try { settings[row.key] = JSON.parse(row.value); } catch (e) { settings[row.key] = row.value; }
  }
  res.json({
    gst_percent: settings.gst_percent !== undefined ? settings.gst_percent : 18,
    other_charges: settings.other_charges || []
  });
});

router.put('/settings', (req, res) => {
  const db = req.app.get('db');
  const { gst_percent, other_charges } = req.body;

  const upsert = db.prepare(`
    INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
  `);

  const saveAll = db.transaction(() => {
    if (gst_percent !== undefined) {
      upsert.run('gst_percent', JSON.stringify(gst_percent));
    }
    if (other_charges !== undefined) {
      upsert.run('other_charges', JSON.stringify(other_charges));
    }
  });

  try {
    saveAll();
    res.json({ message: 'Settings saved' });
  } catch (err) {
    console.error('Settings save error:', err);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

module.exports = router;
