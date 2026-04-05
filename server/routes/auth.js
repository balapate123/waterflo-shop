const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, company_name, contact_name, phone, address } = req.body;

  if (!email || !password || !company_name || !contact_name || !phone) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const db = req.app.get('db');

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase().trim());
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = db.prepare(`
      INSERT INTO users (email, password_hash, company_name, contact_name, phone, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(email.toLowerCase().trim(), hash, company_name.trim(), contact_name.trim(), phone.trim(), (address || '').trim());

    // Give new user access to all brands by default
    const brands = db.prepare('SELECT id FROM brands WHERE active = 1').all();
    const insertBrand = db.prepare('INSERT INTO user_brands (user_id, brand_id) VALUES (?, ?)');
    for (const b of brands) {
      insertBrand.run(result.lastInsertRowid, b.id);
    }

    res.status(201).json({
      message: 'Registration successful. Your account is pending approval.',
      userId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const db = req.app.get('db');
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());

  if (!user) {
    // Dummy bcrypt compare to prevent timing-based user enumeration
    await bcrypt.compare(password, '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012');
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (user.status === 'pending') {
    return res.status(403).json({ error: 'Your account is pending approval. Please wait for admin approval.', status: 'pending' });
  }

  if (user.status === 'suspended') {
    return res.status(403).json({ error: 'Your account has been suspended. Please contact admin.', status: 'suspended' });
  }

  req.session.userId = user.id;
  req.session.save(() => {
    res.json({
      user: {
        id: user.id,
        email: user.email,
        company_name: user.company_name,
        contact_name: user.contact_name,
        phone: user.phone,
        role: user.role,
        discount_percent: user.discount_percent
      }
    });
  });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logged out' });
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const db = req.app.get('db');
  const user = db.prepare('SELECT id, email, company_name, contact_name, phone, address, status, discount_percent, role FROM users WHERE id = ?').get(req.session.userId);

  if (!user) {
    req.session.destroy();
    return res.status(401).json({ error: 'User not found' });
  }

  if (user.status !== 'approved') {
    return res.status(403).json({ error: 'Account not approved', status: user.status });
  }

  // Fetch per-category discounts
  const categoryDiscounts = db.prepare(
    'SELECT category, discount_percent FROM user_category_discounts WHERE user_id = ?'
  ).all(user.id);

  // Build a map { category: discount_percent }
  const categoryDiscountMap = {};
  for (const d of categoryDiscounts) {
    categoryDiscountMap[d.category] = d.discount_percent;
  }

  // If salesman: fetch their linked dealers with each dealer's discounts
  let linked_dealers = undefined;
  if (user.role === 'salesman') {
    const dealers = db.prepare(`
      SELECT u.id, u.company_name, u.contact_name, u.phone, u.email,
             u.discount_percent, u.address
      FROM salesman_dealers sd
      JOIN users u ON sd.dealer_id = u.id
      WHERE sd.salesman_id = ? AND u.status = 'approved'
      ORDER BY u.company_name
    `).all(user.id);

    // For each dealer, load their category discounts too
    const getCatDiscs = db.prepare('SELECT category, discount_percent FROM user_category_discounts WHERE user_id = ?');
    linked_dealers = dealers.map(d => {
      const catDiscs = getCatDiscs.all(d.id);
      const catDiscMap = {};
      for (const cd of catDiscs) catDiscMap[cd.category] = cd.discount_percent;
      return { ...d, category_discounts: catDiscMap };
    });
  }

  res.json({ user, category_discounts: categoryDiscountMap, linked_dealers });
});


module.exports = router;
