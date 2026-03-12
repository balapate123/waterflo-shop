const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const Database = require('better-sqlite3');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// ─── Startup Validation ────────────────────────────────────────────────────────

if (isProd && !process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET environment variable is required in production.');
  process.exit(1);
}

if (isProd && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length < 32) {
  console.error('FATAL: SESSION_SECRET must be at least 32 characters.');
  process.exit(1);
}

// ─── Database setup ────────────────────────────────────────────────────────────

const DB_PATH = path.join(__dirname, 'db', 'waterflo.db');
if (!fs.existsSync(DB_PATH)) {
  console.error('Database not found. Run "npm run seed" first.');
  process.exit(1);
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Migrations: add image_url column to products if missing
try {
  db.prepare("SELECT image_url FROM products LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE products ADD COLUMN image_url TEXT");
  console.log('Migration: added image_url to products table');
}

// Migrations: add discount columns to orders if missing
try {
  db.prepare("SELECT discount_percent FROM orders LIMIT 1").get();
} catch (e) {
  db.exec("ALTER TABLE orders ADD COLUMN discount_percent REAL DEFAULT 0");
  db.exec("ALTER TABLE orders ADD COLUMN net_amount REAL DEFAULT 0");
  db.exec("UPDATE orders SET net_amount = total_amount WHERE net_amount = 0 OR net_amount IS NULL");
  console.log('Migration: added discount_percent and net_amount to orders table');
}

// Database hardening: add missing indexes and triggers
try {
  db.exec("CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id)");
  db.exec(`CREATE TRIGGER IF NOT EXISTS trg_orders_updated_at
    AFTER UPDATE ON orders
    BEGIN
      UPDATE orders SET updated_at = datetime('now') WHERE id = NEW.id;
    END`);
} catch (e) { /* already exists */ }

app.set('db', db);

// ─── Security Headers (helmet) ─────────────────────────────────────────────────

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    }
  },
  crossOriginEmbedderPolicy: false,
}));

// ─── Request Logging ───────────────────────────────────────────────────────────

app.use(morgan(isProd ? 'combined' : 'dev'));

// ─── Body Parsing ──────────────────────────────────────────────────────────────

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ─── Rate Limiting ─────────────────────────────────────────────────────────────

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { error: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// ─── Session ───────────────────────────────────────────────────────────────────

app.use(session({
  store: new SQLiteStore({
    dir: path.join(__dirname, 'db'),
    db: 'sessions.db'
  }),
  secret: process.env.SESSION_SECRET || 'waterflo-dev-secret-not-for-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd
  }
}));

// ─── Trust proxy (for rate limiting behind nginx/cloudflare) ────────────────────

if (isProd) {
  app.set('trust proxy', 1);
}

// ─── Auth Gate ─────────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot)$/)) return next();
  if (req.path === '/login.html' || req.path === '/login') return next();

  if (!req.session || !req.session.userId) {
    return res.redirect('/login.html');
  }

  const user = db.prepare('SELECT status FROM users WHERE id = ?').get(req.session.userId);
  if (!user || user.status !== 'approved') {
    req.session.destroy();
    return res.redirect('/login.html');
  }

  next();
});

// ─── Static Files ──────────────────────────────────────────────────────────────

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(express.static(path.join(__dirname, '..'), {
  index: false
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ─── Health Check ──────────────────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  try {
    db.prepare('SELECT 1').get();
    res.json({ status: 'ok', uptime: process.uptime() });
  } catch (e) {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

// ─── API Routes ────────────────────────────────────────────────────────────────

app.use('/api/auth', require('./routes/auth'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));

// ─── 404 Handler ───────────────────────────────────────────────────────────────

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.status(404).send('Page not found');
});

// ─── Global Error Handler ──────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: isProd ? 'Internal server error' : err.message
  });
});

// ─── Start Server ──────────────────────────────────────────────────────────────

const server = app.listen(PORT, () => {
  console.log(`Waterflo server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port or stop the existing process.`);
    process.exit(1);
  }
  throw err;
});

// ─── Graceful Shutdown ─────────────────────────────────────────────────────────

function shutdown() {
  console.log('Shutting down gracefully...');
  server.close(() => {
    db.close();
    process.exit(0);
  });
  // Force close after 10 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    db.close();
    process.exit(1);
  }, 10000);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
