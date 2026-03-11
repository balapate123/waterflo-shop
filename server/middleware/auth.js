// Auth middleware

function requireAuth(req, res, next) {
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

  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  });
}

module.exports = { requireAuth, requireAdmin };
