#!/bin/bash

# Quick Railway deployment fix script
echo "Creating Railway deployment fix..."

# Create a simple production server that works with Railway
cat > start-server.js << 'EOF'
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Production static file serving
const publicDir = path.join(__dirname, 'dist', 'public');

console.log('=== RAILWAY PRODUCTION SERVER ===');
console.log('Working directory:', __dirname);
console.log('Public directory:', publicDir);
console.log('Directory exists:', fs.existsSync(publicDir));

if (!fs.existsSync(publicDir)) {
  console.error('ERROR: dist/public not found');
  process.exit(1);
}

console.log('Static files:', fs.readdirSync(publicDir).slice(0, 10));

// Serve static files
app.use(express.static(publicDir));

// SPA fallback
app.get('*', (req, res) => {
  console.log('Serving:', req.path);
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
EOF

echo "✅ Created start-server.js"
echo "Now manually update your package.json start script to: \"start\": \"node start-server.js\""
echo "Then commit and push to GitHub to trigger Railway redeploy"