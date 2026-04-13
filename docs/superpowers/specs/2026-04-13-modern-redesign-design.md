# Waterflo Modern UI Redesign

## Overview

Full visual refresh of the Waterflo distributor ordering website. The site currently uses system fonts, emoji icons, heavy gradient shadows, and cramped spacing — giving it a dated, prototype-like feel. This redesign modernizes every page with professional typography, SVG icons, cleaner layout, and better visual hierarchy while preserving all existing business logic.

Additionally, a new Brand Management feature is added to the admin panel, allowing logo and banner image uploads per brand.

## Design Direction

**Bold Brand-Forward** — evolves the existing navy + red + gold palette with stronger brand identity. Each brand retains its signature color. The overall feel shifts from "children's website" to "professional B2B ordering tool."

## Design System

### Typography

- **Font family:** Plus Jakarta Sans (Google Fonts) — weights 400, 500, 600, 700, 800
- **CSS import:** `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap')`
- **Fallback:** system-ui, -apple-system, sans-serif
- **Body text:** 14px (0.875rem), weight 400, line-height 1.5
- **Headings:** 700-800 weight, tracked tighter (-0.01em)
- **Monospace (codes):** 'SF Mono', 'Cascadia Code', monospace

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#1a237e` | Headers, nav active, primary buttons |
| `--primary-dark` | `#0f172a` | Header background (top tier) |
| `--primary-light` | `#3949ab` | Hover states |
| `--accent` | `#c62828` | Destructive actions, urgent badges |
| `--gold` | `#f9a825` | Active nav indicator, brand accent |
| `--bg` | `#f8fafc` | Page background |
| `--card` | `#ffffff` | Card surfaces |
| `--text` | `#1e293b` | Primary text |
| `--text-secondary` | `#64748b` | Secondary/meta text |
| `--text-muted` | `#94a3b8` | Hints, placeholders |
| `--border` | `#e2e8f0` | Borders, dividers |
| `--border-light` | `#f1f5f9` | Subtle separators |
| `--focus-ring` | `rgba(26,35,126,0.1)` | Focus ring glow |

### Shadows

- `--shadow-sm`: `0 1px 3px rgba(0,0,0,0.05)` — cards, inputs
- `--shadow-md`: `0 4px 12px rgba(0,0,0,0.08)` — hover states, dropdowns
- `--shadow-lg`: `0 12px 40px rgba(0,0,0,0.12)` — modals

### Spacing

8dp rhythm: 4, 8, 12, 16, 20, 24, 32, 48px. All padding/margins use this scale.

### Border Radius

- Cards: 12px
- Buttons: 8px
- Inputs: 8-10px
- Pills/badges: 50px
- Small elements: 4-6px

### Icons

Replace ALL emoji with Lucide SVG icons (inline SVG, not icon font). Key mappings:

| Current | New (Lucide) |
|---------|-------------|
| 🛒 Cart | `shopping-cart` |
| 📋 Orders | `file-text` |
| ⏻ Logout | `log-out` |
| ⚙️ Admin | `settings` |
| 🔍 Search | `search` |
| 🗑 Clear | `trash-2` |
| ⚙️ Fittings | `wrench` |
| 🔵 Pipes | `cylinder` (or custom pipe icon) |
| 🔀 Reducers | `arrow-down-narrow-wide` |
| 🥉 Brass | `circle-dot` |
| 🚿 Valves | `toggle-left` |
| 🔧 Mixer | `combine` |
| 🧴 Accessories | `package` |
| 📦 All Products | `grid-3x3` |

Icons are rendered as inline SVG (20x20 for nav, 16x16 for inline, 24x24 for feature icons), stroke-width 2, currentColor.

## Page Designs

### Login Page (login.html)

**Changes:**
- Add Plus Jakarta Sans font import
- Update input styling: `border: 1.5px solid #e2e8f0`, `border-radius: 10px`, `background: #f8fafc`
- Add focus ring: `box-shadow: 0 0 0 3px var(--focus-ring)`
- Update button styling to match new radius and font
- Keep the gradient background and card layout (these are fine)

### Homepage (index.html)

**Two-tier header:**
- Top bar (`--primary-dark` background): Logo mark (square with W) + text logo + subtitle on left, user avatar (initials circle) + name + role on right
- Nav bar (same background, bottom border): SVG icon + label items — Brands (active), Cart (with badge), My Orders, Admin (if admin), Logout (right-aligned). Active item has `--gold` bottom border

**Search area:**
- White/light background (`--bg`), not on gradient
- Clean input: white background, `--border` border, 12px radius, SVG search icon left, placeholder "Search products across all brands..."
- Focus: blue border + subtle focus ring shadow
- Keyboard hint below: "Search by name, code, or size"

**Salesman dealer selector:**
- Rendered as a card component (white, 12px radius, subtle shadow)
- Header: SVG users icon + "Placing Order On Behalf Of" label
- Body: selected dealer shown with initials avatar, company name, location/discount meta
- "Change" link to swap dealer
- Dropdown replaced with a searchable select or styled dropdown

**Brand grid:**
- Full-bleed color cards (option C with larger logos)
- Each card: full brand gradient background, logo image (large, ~60-70px) top-left with padding, brand name + tagline bottom-left in white
- If no logo uploaded: show 2-letter icon code in a rounded square as fallback
- Hover: subtle scale(1.02) + shadow increase
- Grid: 2 columns mobile, 3 tablet, 4 desktop

### Brand Page (brand.html)

**Header:** Same two-tier header as homepage

**Brand hero:**
- If banner_url exists: show banner image as background with gradient overlay for text readability
- If no banner: use brand gradient (existing behavior, cleaner)
- Brand logo shown in hero alongside brand name
- Tagline below

**Category tabs:**
- Remove emoji prefixes from tab labels
- Clean text-only pills with brand color for active state
- Keep horizontal scroll on mobile

**Filter bar:**
- Updated input/select styling to match new design system
- Search icon as SVG

**Product cards:**
- Image area: light gray background (`--border-light`) with SVG category icon (not emoji)
- Category badge: small pill in top-left of image area
- Body: product name (700 weight), code (monospace, muted), size badge + price on same row
- Add to cart button: full-width, `--primary` background, 8px radius, SVG plus icon + text

**Cart panel:**
- Same slide-in behavior
- Updated header: cleaner gradient
- Cart items: remove emoji category icons, use colored dot or small SVG
- Updated quantity stepper styling
- Cleaner footer with updated button styles

### Admin Dashboard (admin.html)

**New Brands tab (6th tab):**
- Tab nav gains "Brands" between Products and Settings
- Brands tab content: card grid of all 8 brands
- Each brand card shows: current logo (or fallback icon), brand name, tagline, status indicator
- Click card → opens Brand Edit Modal

**Brand Edit Modal:**
- Logo upload: drag-and-drop area or file input, preview with remove button
- Banner image upload: same pattern, wider preview
- Brand color: color input or hex field (updates gradient preview)
- Tagline: text input
- Active/inactive: toggle switch
- Save/Cancel buttons

**Other admin updates:**
- User brand assignment: replace checkbox list with color-coded brand chips (toggle on click, active state with checkmark)
- Stat cards: subtle shadow, cleaner typography
- Tables: updated header background (`#f8fafc`), font styling
- Buttons: updated radius and font to match design system
- All emoji references removed (status badges, action buttons)

## New Feature: Brand Logo & Image Management

### Database

Add columns to existing `brands` table:

```sql
ALTER TABLE brands ADD COLUMN logo_url TEXT;
ALTER TABLE brands ADD COLUMN banner_url TEXT;
```

The seed script should set these to NULL by default.

### Server API

**Upload endpoint (reuse existing multer pattern):**
```
POST /api/admin/brands/upload-image
```
- Accepts multipart form with `image` field
- Saves to `uploads/brands/` directory (create if not exists)
- Filename: `brand_{timestamp}_{random}.{ext}`
- Returns: `{ image_url: '/uploads/brands/filename.ext' }`
- Validation: jpg/png/webp, max 2MB (same as product images)

**Update brand endpoint:**
```
PUT /api/admin/brands/:id
```
- Body: `{ logo_url, banner_url, tagline, color, active }`
- Updates brands table
- Returns updated brand

**GET /api/brands response update:**
- Include `logo_url` and `banner_url` fields in brand objects

### Frontend Display

**Homepage brand cards:**
```
if (brand.logo_url) → <img src="logo_url" class="brand-card-logo">
else → <div class="brand-card-icon-text">SF</div>
```

**Brand page hero:**
```
if (brand.banner_url) → background-image with gradient overlay
else → brand gradient (current behavior)
```

Logo shown alongside brand name in hero regardless.

### File Storage

- Directory: `uploads/brands/`
- Served statically by Express (already configured for `uploads/products/`)
- Add `uploads/brands/` to `.gitignore` if not already covered

## What Does NOT Change

- All business logic (cart, ordering, pricing, discounts, GST)
- API route structure and endpoints (except new brand endpoints)
- Session-based auth flow
- Product data files and seeding mechanism
- Database schema for products, users, orders, order_items
- Mobile-first responsive breakpoints (375, 480, 600, 768, 900, 1200px)
- Print styles

## Implementation Scope

Files to modify:
- `css/style.css` — full CSS overhaul
- `css/admin.css` — admin styling updates
- `index.html` — header, search, dealer selector, brand cards
- `brand.html` — header, hero, category tabs, product cards
- `login.html` — typography and input styling
- `admin.html` — new Brands tab, brand chips, brand edit modal
- `js/brand-config.js` — add logo_url/banner_url fields
- `js/app.js` — update emoji references to SVG, update rendering functions
- `server/db/schema.sql` — add brand columns
- `server/routes/admin.js` — brand CRUD endpoints, image upload
- `server/routes/brands.js` — include logo/banner in response
- `server/index.js` — serve uploads/brands/ static directory

New files:
- `uploads/brands/` — directory for brand images

## Success Criteria

- No emoji icons visible anywhere in the UI
- Plus Jakarta Sans renders on all pages
- Brand logos uploadable and displayed on homepage + brand page
- Dealer selector feels like a proper component, not a raw dropdown
- Search bar is clean and accessible with focus states
- Admin brand management tab fully functional
- All existing functionality preserved (cart, orders, auth, admin)
- Mobile responsive at all breakpoints
