const express = require('express');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

// GET /api/brands — list brands user has access to
router.get('/', requireAuth, (req, res) => {
  const db = req.app.get('db');

  const brands = db.prepare(`
    SELECT b.* FROM brands b
    INNER JOIN user_brands ub ON b.id = ub.brand_id
    WHERE ub.user_id = ? AND b.active = 1
    ORDER BY b.name
  `).all(req.user.id);

  res.json({ brands });
});

// GET /api/brands/:id/products — get products for a brand
router.get('/:id/products', requireAuth, (req, res) => {
  const db = req.app.get('db');
  const brandId = req.params.id;

  // Check user has access to this brand
  const access = db.prepare('SELECT 1 FROM user_brands WHERE user_id = ? AND brand_id = ?').get(req.user.id, brandId);
  if (!access) {
    return res.status(403).json({ error: 'No access to this brand' });
  }

  let query = 'SELECT * FROM products WHERE brand_id = ? AND active = 1';
  const params = [brandId];

  const { category, subcategory, size, search } = req.query;

  if (category && category !== 'all') {
    query += ' AND category = ?';
    params.push(category);
  }

  if (subcategory) {
    query += ' AND subcategory = ?';
    params.push(subcategory);
  }

  if (size) {
    query += ' AND size = ?';
    params.push(size);
  }

  if (search) {
    query += ' AND (name LIKE ? OR code LIKE ? OR size LIKE ?)';
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  query += ' ORDER BY category, subcategory, size_mm, code';

  const products = db.prepare(query).all(...params);

  // Apply user discount if any
  const discount = req.user.discount_percent || 0;
  if (discount > 0) {
    const factor = 1 - (discount / 100);
    for (const p of products) {
      p.rate = Math.round(p.rate * factor * 100) / 100;
      if (p.rate_3mtr) p.rate_3mtr = Math.round(p.rate_3mtr * factor * 100) / 100;
      if (p.rate_5mtr) p.rate_5mtr = Math.round(p.rate_5mtr * factor * 100) / 100;
    }
  }

  res.json({ products, discount });
});

module.exports = router;
