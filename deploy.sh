#!/bin/bash

echo "🔄 Pulling latest code from Git..."
git pull

echo "🐳 Rebuilding Docker images without cache..."
docker-compose build --no-cache

echo "🚀 Starting containers in detached mode..."
docker-compose up -d

echo "✅ Deployment complete!"