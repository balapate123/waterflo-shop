# Waterflo Production Launch Roadmap

**Created:** 2026-03-11
**Current State:** HIGH RISK — Not Production Ready
**Estimated Effort:** ~37 hours to production-ready launch

---

## Current Issues Summary

| Severity | Count | Examples |
|----------|-------|---------|
| 🔴 Critical | 5 | XSS in admin panel, hardcoded session secret, no HTTPS, no CSRF, unvalidated order items |
| 🟠 High | 5 | Weak password policy, no rate limiting, missing security headers, product duplicate bug, user enumeration |
| 🟡 Medium | 4 | No email verification, session timeout too long, bulk price no limits, no audit logging |

---

## Phase 1: Security Fixes (Week 1) — BLOCKING

> These must be done before any real users touch the system.

### 1.1 XSS Vulnerabilities (Critical, ~3hrs)

- [ ] **admin.html**: All `innerHTML` with user data (company_name, product names, order details)
  - Attacker can register with `<img onerror="steal cookies">` as company name
  - Affects: Lines building user tables, order tables, product tables, dashboard stats
- [ ] **app.js**: Several `innerHTML` spots with API data (lines 311, 314, 316, 326, 390, 577, 586, 592, 603, 700, 756)
- [ ] **Fix**: Escape all user data or use `textContent`. Add DOMPurify for any rich content.

### 1.2 Session & Auth Hardening (Critical, ~2hrs)

- [ ] Remove hardcoded session secret fallback — require `SESSION_SECRET` env var, fail on startup if missing
- [ ] Reduce session `maxAge` from 7 days → 8 hours
- [ ] Set `cookie.secure = true` when `NODE_ENV=production`
- [ ] Strengthen password policy: 6 chars → 8 chars minimum
- [ ] Add bcrypt dummy compare on invalid email to prevent timing attacks

### 1.3 Security Headers & CSRF (Critical, ~2hrs)

- [ ] Add `helmet` middleware (CSP, X-Frame-Options, HSTS, X-Content-Type-Options)
- [ ] Add `express-rate-limit` on `/api/auth/*` (5 attempts per 15 minutes)
- [ ] Add CSRF protection on state-changing routes

### 1.4 Input Validation & Order Integrity (High, ~2hrs)

- [ ] Validate `product_id` exists and belongs to `brand_id` in order submission
- [ ] Fix product duplicate check on edit (exclude own ID: `existing.id !== productId`)
- [ ] Add CHECK constraints on `discount_percent` (0–100) and `rate` (>= 0)
- [ ] Cap bulk price update to ±50%
- [ ] Validate quantities are positive integers in order submission

---

## Phase 2: Production Infrastructure (Week 2)

### 2.1 Environment & Config (~2hrs)

- [ ] Create `.env.example` with all required vars:
  ```
  NODE_ENV=production
  PORT=3000
  SESSION_SECRET=<generate-random-64-char-string>
  ```
- [ ] Add startup validation: fail if `SESSION_SECRET`, `NODE_ENV` not set
- [ ] Randomize default admin password in seed (print once, never log again)
- [ ] Add `"engines": { "node": ">=18.0.0" }` to package.json

### 2.2 Error Handling & Logging (~3hrs)

- [ ] Add global Express error handler middleware
- [ ] Add 404 handler (wildcard route at end)
- [ ] Add `morgan` for request logging
- [ ] Strip stack traces from production error responses
- [ ] Handle `EADDRINUSE` on startup
- [ ] Clear cart from localStorage on logout

### 2.3 Database Hardening (~2hrs)

- [ ] Add missing index: `CREATE INDEX idx_order_items_product ON order_items(product_id)`
- [ ] Add UPDATE trigger for `updated_at` timestamps
- [ ] Add CHECK constraints (discount 0–100, rate >= 0)
- [ ] Set up automated SQLite backup (daily cron, copy .db file)

### 2.4 Process Management (~2hrs)

- [ ] Add PM2 ecosystem config (`ecosystem.config.js`)
  ```js
  module.exports = {
    apps: [{
      name: 'waterflo',
      script: 'server/index.js',
      instances: 2,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production'
      }
    }]
  };
  ```
- [ ] Add health check endpoint (`GET /api/health`)
- [ ] Verify graceful shutdown works with PM2

---

## Phase 3: Testing (Week 2–3, ~8hrs)

### 3.1 Critical Path Tests

- [ ] Auth flow: register → admin approve → login → logout
- [ ] Order flow: browse products → add to cart → submit order → view order
- [ ] Admin flow: user management, order status changes, product CRUD
- [ ] Tools: `jest` + `supertest` for API tests

### 3.2 Security Tests

- [ ] XSS payload tests on all user input fields
- [ ] SQL injection attempts on search/filter params
- [ ] Unauthorized access: unapproved user, non-admin accessing admin routes
- [ ] Rate limit verification on auth endpoints
- [ ] CSRF token validation

### 3.3 Load Tests

- [ ] 100 concurrent users browsing products
- [ ] 50 concurrent order submissions
- [ ] Tools: `artillery` or `k6`

---

## Phase 4: Hosting & Deployment (Week 3)

### Hosting Comparison

| Option | Monthly Cost | 1000 Users | Complexity | SQLite OK? |
|--------|-------------|------------|------------|------------|
| **DigitalOcean Droplet** ⭐ | $12–24/mo | ✅ | Medium | ✅ |
| Railway | $5–20/mo | ✅ | Very Low | ✅ (with volume) |
| Render | $7–25/mo | ✅ | Low | ✅ (with disk) |
| AWS Lightsail | $10–20/mo | ✅ | Medium | ✅ |
| Hetzner VPS | $5–10/mo | ✅ | Medium-High | ✅ |

### Recommended: DigitalOcean Droplet ($12/mo)

**Why this fits:**
- SQLite works great on a single server (1200 products, 1000 users is small)
- Full control over the server
- **Bangalore datacenter** — low latency for Indian users
- Easy to scale up ($24/mo for 4GB RAM if needed)
- Simple setup

### Production Architecture

```
User → Cloudflare (DNS + CDN + Free SSL) → DigitalOcean Droplet (Bangalore)
                                             ├── nginx (reverse proxy)
                                             ├── PM2 (process manager, 2 workers)
                                             │   └── Node.js / Express
                                             │       └── SQLite (waterflo.db)
                                             └── Daily backup → DO Spaces ($5/mo)
```

### Why Cloudflare in front (Free tier):
- Free SSL certificate (handles HTTPS)
- DDoS protection
- CDN caches static assets globally
- Analytics & bot protection

### 4.1 Deployment Steps

1. [ ] Domain: Point waterflo.in DNS to Cloudflare
2. [ ] Create DigitalOcean droplet: Ubuntu 22.04, Bangalore, 2GB RAM / 1 vCPU
3. [ ] Server setup:
   ```bash
   # Install Node 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt install -y nodejs nginx

   # Install PM2
   sudo npm install -g pm2

   # Firewall
   sudo ufw allow OpenSSH
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```
4. [ ] Configure nginx reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name waterflo.in www.waterflo.in;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
5. [ ] SSL: Configure via Cloudflare (Full Strict mode) or Let's Encrypt (`certbot`)
6. [ ] Deploy app:
   ```bash
   git clone <repo> /var/www/waterflo
   cd /var/www/waterflo
   npm install --production
   cp .env.example .env  # Edit with production values
   node server/db/seed.js
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```
7. [ ] Set up daily backup:
   ```bash
   # /etc/cron.d/waterflo-backup
   0 2 * * * root sqlite3 /var/www/waterflo/server/db/waterflo.db ".backup '/backups/waterflo-$(date +\%Y\%m\%d).db'"
   ```
8. [ ] Point DNS A record to droplet IP via Cloudflare

### 4.2 Scaling Notes (1000 Users)

- SQLite handles 1000 concurrent **readers** fine with WAL mode (already enabled)
- Writes are serialized but write volume is low (orders, registrations)
- 2GB RAM handles ~500 concurrent connections easily
- **If you outgrow this:** Upgrade droplet to $24/mo (4GB) before considering PostgreSQL migration

---

## Phase 5: Pre-Launch Checklist (Week 3–4)

- [ ] Change default admin password on production
- [ ] Verify all env vars set correctly
- [ ] Test full user flow on production URL (register → approve → order)
- [ ] Test on mobile devices (distributors likely use phones)
- [ ] Set up uptime monitoring — [UptimeRobot](https://uptimerobot.com/) (free, 50 monitors)
- [ ] Set up error alerting — [Sentry](https://sentry.io/) free tier or email on PM2 crash
- [ ] Run backup & restore test
- [ ] Load test with 100 concurrent users
- [ ] Verify Cloudflare caching works for static assets
- [ ] Test from multiple Indian cities (latency check)

---

## Phase 6: Post-Launch Enhancements (Week 4+)

- [ ] Email notifications (Resend.com or Nodemailer + Gmail SMTP)
  - Order placed → notify admin
  - Order status changed → notify customer
  - User approved → notify user
- [ ] Audit logging for admin actions (who changed what, when)
- [ ] Product image uploads to DigitalOcean Spaces
- [ ] PDF invoice generation for orders
- [ ] Analytics dashboard (order volume, top products, user activity)

---

## Timeline Summary

| Week | Focus | Effort |
|------|-------|--------|
| **Week 1** | Security fixes (XSS, auth, headers, validation) | ~10hrs |
| **Week 2** | Infrastructure (config, logging, DB, PM2) + start tests | ~12hrs |
| **Week 3** | Finish tests + deploy to DigitalOcean + DNS setup | ~10hrs |
| **Week 4** | Pre-launch testing, monitoring, **go live** | ~5hrs |

**Total: ~37 hours to production-ready launch.**

---

## New Dependencies to Install

```bash
npm install helmet express-rate-limit morgan
npm install --save-dev jest supertest
```
