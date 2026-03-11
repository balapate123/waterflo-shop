# Waterflo Distributor Ordering Platform

Waterflo is a modern, high-converting distributor ordering platform designed for seamless inventory management and order processing.

## Features

- **Storefront**: A premium browsing experience for products.
- **Admin Dashboard**: Comprehensive management of products, categories, and orders.
- **Order Tracking**: Real-time status updates for customers.
- **Brand Identity**: Customizable branding for distributors.

## Tech Stack

- **Backend**: Node.js with Express.
- **Database**: SQLite (using `better-sqlite3`).
- **Styling**: Vanilla CSS with modern design principles (glassmorphism, vibrant palettes).
- **File Uploads**: Multer for handling product images.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   ```bash
   npm run seed
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

## Project Structure

- `server/`: Express server, database logic, and API routes.
- `css/`: Modern vanilla CSS styles.
- `js/`: Frontend logic and interactive components.
- `admin.html`, `brand.html`, `index.html`, `login.html`: Main application pages.
