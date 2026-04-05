const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders — create order from cart
router.post('/', requireAuth, (req, res) => {
  const db = req.app.get('db');
  const { items, brand_id, notes, dealer_id } = req.body;

  if (!items || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: 'Order must have at least one item' });
  }

  if (!brand_id) {
    return res.status(400).json({ error: 'Brand ID required' });
  }

  // ── Determine the effective user (dealer) for this order ─────────────────
  // For salesman placing on behalf of a dealer, we use the dealer's account.
  let effectiveUser = req.user; // default: logged-in user IS the dealer

  if (req.user.role === 'salesman') {
    if (!dealer_id) {
      return res.status(400).json({ error: 'Salesman must specify a dealer_id' });
    }
    // Verify the salesman is linked to this dealer
    const link = db.prepare(
      'SELECT 1 FROM salesman_dealers WHERE salesman_id = ? AND dealer_id = ?'
    ).get(req.user.id, dealer_id);
    if (!link) {
      return res.status(403).json({ error: 'You are not assigned to this dealer' });
    }
    // Load the dealer's full record
    const dealer = db.prepare(
      'SELECT id, email, company_name, contact_name, phone, discount_percent, role, status FROM users WHERE id = ? AND status = ?'
    ).get(dealer_id, 'approved');
    if (!dealer) {
      return res.status(400).json({ error: 'Dealer not found or not approved' });
    }
    effectiveUser = dealer;
  }

  // Validate brand exists
  const brand = db.prepare('SELECT id FROM brands WHERE id = ? AND active = 1').get(brand_id);
  if (!brand) {
    return res.status(400).json({ error: 'Invalid brand' });
  }

  // Validate effective user has access to this brand
  const brandAccess = db.prepare('SELECT 1 FROM user_brands WHERE user_id = ? AND brand_id = ?').get(effectiveUser.id, brand_id);
  if (!brandAccess) {
    return res.status(403).json({ error: 'No access to this brand' });
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

    // Validate product_id belongs to the brand if provided
    if (item.product_id) {
      const product = db.prepare('SELECT id FROM products WHERE id = ? AND brand_id = ? AND active = 1').get(item.product_id, brand_id);
      if (!product) {
        return res.status(400).json({ error: `Product ID ${item.product_id} is not valid for this brand` });
      }
    }
  }

  // Generate order number: WF-YYYYMMDD-XXXX
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const count = db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_no LIKE ?").get(`WF-${datePart}%`).c;
  const orderNo = `WF-${datePart}-${String(count + 1).padStart(4, '0')}`;

  // Fetch per-category discounts for the EFFECTIVE (dealer) user — authoritative
  const categoryDiscRows = db.prepare(
    'SELECT category, discount_percent FROM user_category_discounts WHERE user_id = ?'
  ).all(effectiveUser.id);
  const categoryDiscMap = {};
  for (const d of categoryDiscRows) {
    categoryDiscMap[d.category] = d.discount_percent;
  }
  const hasCategoryDiscounts = Object.keys(categoryDiscMap).length > 0;

  // Fallback flat discount from effective user record
  const userDiscPct = effectiveUser.discount_percent || 0;

  // Calculate totals: per-item if category discounts exist, else flat
  let totalAmount = 0;
  let totalDiscount = 0;

  for (const item of items) {
    const lineTotal = (item.rate_per_unit || 0) * (item.qty || 0);
    totalAmount += lineTotal;

    if (hasCategoryDiscounts) {
      const tradeCategory = item.trade_category || null;
      const discPct = (tradeCategory && categoryDiscMap[tradeCategory] !== undefined)
        ? categoryDiscMap[tradeCategory]
        : 0;
      totalDiscount += discPct > 0 ? Math.round(lineTotal * discPct / 100 * 100) / 100 : 0;
    }
  }

  if (!hasCategoryDiscounts && userDiscPct > 0) {
    totalDiscount = Math.round(totalAmount * userDiscPct / 100 * 100) / 100;
  }

  const netAmount = totalAmount - totalDiscount;
  const effectiveDiscPct = totalAmount > 0 ? Math.round(totalDiscount / totalAmount * 10000) / 100 : 0;

  // The salesman_id to store (null if dealer placed the order themselves)
  const salesmanId = req.user.role === 'salesman' ? req.user.id : null;

  try {
    const orderResult = db.prepare(`
      INSERT INTO orders (order_no, user_id, brand_id, total_amount, discount_percent, net_amount, notes, placed_by_salesman_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(orderNo, effectiveUser.id, brand_id, totalAmount, effectiveDiscPct, netAmount, notes || null, salesmanId);

    const orderId = orderResult.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, code, name, size, unit_type, unit_label, pcs_per_unit, rate_per_unit, qty)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertItems = db.transaction((orderId, items) => {
      for (const item of items) {
        insertItem.run(
          orderId,
          item.product_id || null,
          item.code,
          item.name,
          item.size,
          item.unit_type,
          item.unit_label,
          item.pcs_per_unit,
          item.rate_per_unit,
          item.qty
        );
      }
    });

    insertItems(orderId, items);

    res.status(201).json({
      message: 'Order placed successfully',
      order: {
        id: orderId,
        order_no: orderNo,
        total_amount: totalAmount,
        discount_percent: effectiveDiscPct,
        net_amount: netAmount,
        status: 'pending',
        created_at: now.toISOString(),
        placed_by_salesman_id: salesmanId
      }
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});


// GET /api/orders — list user's orders (dealer sees own orders; salesman sees orders they placed)
router.get('/', requireAuth, (req, res) => {
  const db = req.app.get('db');

  let orders;
  if (req.user.role === 'salesman') {
    // Salesman sees all orders they have placed across all dealers
    orders = db.prepare(`
      SELECT o.*, b.name as brand_name, b.short_name as brand_short_name,
             u.company_name as dealer_company, u.contact_name as dealer_contact
      FROM orders o
      LEFT JOIN brands b ON o.brand_id = b.id
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.placed_by_salesman_id = ?
      ORDER BY o.created_at DESC
    `).all(req.user.id);
  } else {
    orders = db.prepare(`
      SELECT o.*, b.name as brand_name, b.short_name as brand_short_name
      FROM orders o
      LEFT JOIN brands b ON o.brand_id = b.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `).all(req.user.id);
  }

  res.json({ orders });
});

// GET /api/orders/:id — get order details
router.get('/:id', requireAuth, (req, res) => {
  const db = req.app.get('db');

  let order;
  if (req.user.role === 'salesman') {
    // Salesman can view orders they placed
    order = db.prepare(`
      SELECT o.*, b.name as brand_name, b.short_name as brand_short_name,
             u.company_name as dealer_company, u.contact_name as dealer_contact
      FROM orders o
      LEFT JOIN brands b ON o.brand_id = b.id
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ? AND o.placed_by_salesman_id = ?
    `).get(req.params.id, req.user.id);
  } else {
    order = db.prepare(`
      SELECT o.*, b.name as brand_name, b.short_name as brand_short_name
      FROM orders o
      LEFT JOIN brands b ON o.brand_id = b.id
      WHERE o.id = ? AND o.user_id = ?
    `).get(req.params.id, req.user.id);
  }

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

  res.json({ order, items });
});

module.exports = router;
