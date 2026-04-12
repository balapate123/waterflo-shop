#!/usr/bin/env bash
set -e

# Render disk is mounted at /data
if [ -d "/data" ]; then
  echo "Setting up persistent disk symlinks..."
  
  # Create directories on the persistent disk if they don't exist
  mkdir -p /data/db
  mkdir -p /data/uploads/products
  
  # Link them into the app structure that the code expects
  # Remove the existing directories if they exist
  rm -rf server/db
  rm -rf uploads
  
  ln -s /data/db server/db
  ln -s /data/uploads uploads
fi

# Run the seed script if the database doesn't exist yet
if [ ! -f server/db/waterflo.db ]; then
  echo "First run detected! Seeding the database..."
  npm run seed
fi

# Start the application
npm start
