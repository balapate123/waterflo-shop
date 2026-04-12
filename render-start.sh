#!/usr/bin/env bash
set -e

# Export the database directory path to the persistent disk if it exists
if [ -d "/data" ]; then
  echo "Using Render persistent disk at /data..."
  
  # Ensure the database directory exists on the persistent disk
  mkdir -p /data/db
  export DB_DIR=/data/db
  
  # Ensure the uploads directory exists on the persistent disk
  mkdir -p /data/uploads/products
  
  # Link the uploads directory (It's safe to symlink since no code runs inside uploads)
  rm -rf uploads
  ln -s /data/uploads uploads
else
  export DB_DIR=server/db
fi

# Run the seed script if the database doesn't exist yet
if [ ! -f "$DB_DIR/waterflo.db" ]; then
  echo "First run detected! Seeding the database at $DB_DIR..."
  npm run seed
fi

# Start the application
npm start
