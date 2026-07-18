#!/bin/bash
# Run this ONCE inside the finstud-project folder, after you've set your
# git identity to match your GitHub account (git config --global user.email "you@example.com").
# It creates a real git history in logical steps instead of one giant commit.
set -e

git init
git branch -M main

git add .gitignore README.md
git commit -m "Add project README and gitignore"

git add finstud-backend/package.json finstud-backend/package-lock.json finstud-backend/.env.example finstud-backend/config finstud-backend/middleware
git commit -m "Add backend scaffolding: config, middleware, dependencies"

git add finstud-backend/routes finstud-backend/server.js finstud-backend/create-db.js finstud-backend/drop-db.js finstud-backend/setup-db.js finstud-backend/README.md
git commit -m "Add backend API routes and server entry point"

git add finstud/css finstud/js
git commit -m "Add frontend styles and shared JS (store, main)"

git add finstud/pages finstud/index.html
git commit -m "Add frontend pages: onboarding, signup, dashboard, money, wealth, essentials, settings"

git add test.js
git commit -m "Add misc script"

echo ""
echo "Done. Review with: git log --oneline"
echo "Then connect to GitHub with:"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"
