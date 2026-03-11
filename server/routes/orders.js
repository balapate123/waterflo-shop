const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders — create order from cart
router.post('/', requireAuth, (req, res) => {
  const db = req.app.get('db');
  const { items, brand_id, notes, discount_percent } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ error: 'Order must have at least one item' });
  }

  if (!brand_id) {
    return res.status(400).json({ error: 'Brand ID required' });
  }

  // Generate order number: WF-YYYYMMDD-XXXX
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const count = db.prepare("SELECT COUNT(*) as c FROM orders WHERE order_no LIKE ?").get(`WF-${datePart}%`).c;
  const orderNo = `WF-${datePart}-${String(count + 1).padStart(4, '0')}`;

  // Use discount from user record (authoritative), not from client
  const userDiscPct = req.user.discount_percent || 0;

  // Calculate total (original prices)
  let totalAmount = 0;
  for (const item of items) {
    totalAmount += (item.rate_per_unit || 0) * (item.qty || 0);
  }

  // Calculate net after discount
  const discountAmt = userDiscPct > 0 ? Math.round(totalAmount * userDiscPct / 100 * 100) / 100 : 0;
  const netAmount = totalAmount - discountAmt;

  try {
    const orderResult = db.prepare(`
      INSERT INTO orders (order_no, user_id, brand_id, total_amount, discount_percent, net_amount, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(orderNo, req.user.id, brand_id, totalAmount, userDiscPct, netAmount, notes || null);

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
        discount_percent: userDiscPct,
        net_amount: netAmount,
        status: 'pending',
        created_at: now.toISOString()
      }
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders — list user's orders
router.get('/', requireAuth, (req, res) => {
  const db = req.app.get('db');

  const orders = db.prepare(`
    SELECT o.*, b.name as brand_name, b.short_name as brand_short_name
    FROM orders o
    LEFT JOIN brands b ON o.brand_id = b.id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `).all(req.user.id);

  res.json({ orders });
});

// GET /api/orders/:id — get order details
router.get('/:id', requireAuth, (req, res) => {
  const db = req.app.get('db');

  const order = db.prepare(`
    SELECT o.*, b.name as brand_name, b.short_name as brand_short_name
    FROM orders o
    LEFT JOIN brands b ON o.brand_id = b.id
    WHERE o.id = ? AND o.user_id = ?
  `).get(req.params.id, req.user.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(order.id);

  res.json({ order, items });
});

module.exports = router;
