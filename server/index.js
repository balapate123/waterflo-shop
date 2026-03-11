const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Database setup
const DB_PATH = path.join(__dirname, 'db', 'waterflo.db');
if (!fs.existsSync(DB_PATH)) {
  console.error('Database not found. Run "npm run seed" first.');
  process.exit(1);
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Migrations: add discount columns to orders if missing
try {
  db.prepare("SELECT discount_percent FROM orders LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE orders ADD COLUMN discount_percent REAL DEFAULT 0");
  db.exec("ALTER TABLE orders ADD COLUMN net_amount REAL DEFAULT 0");
  // Backfill: for existing orders, net_amount = total_amount (no discount was stored)
  db.exec("UPDATE orders SET net_amount = total_amount WHERE net_amount = 0 OR net_amount IS NULL");
  console.log('Migration: added discount_percent and net_amount to orders table');
}

app.set('db', db);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  store: new SQLiteStore({
    dir: path.join(__dirname, 'db'),
    db: 'sessions.db'
  }),
  secret: process.env.SESSION_SECRET || 'waterflo-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Auth gate: protect HTML pages (except login.html and static assets)
app.use((req, res, next) => {
  // Allow API routes to pass through (handled by route-level middleware)
  if (req.path.startsWith('/api/')) return next();

  // Allow static assets (css, js, images, fonts)
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) return next();

  // Allow login page
  if (req.path === '/login.html' || req.path === '/login') return next();

  // For all other pages, check auth
  if (!req.session || !req.session.userId) {
    return res.redirect('/login.html');
  }

  // Check user is approved
  const user = db.prepare('SELECT status FROM users WHERE id = ?').get(req.session.userId);
  if (!user || user.status !== 'approved') {
    req.session.destroy();
    return res.redirect('/login.html');
  }

  next();
});

// Serve static files from project root
app.use(express.static(path.join(__dirname, '..'), {
  index: false // Don't auto-serve index.html, let the auth gate handle it
}));

// Explicitly handle / and /index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// Start server
app.listen(PORT, () => {
  console.log(`Waterflo server running on http://localhost:${PORT}`);
  console.log(`Login: http://localhost:${PORT}/login.html`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
