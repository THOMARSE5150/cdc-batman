// Railway Production Server - Simple Static File Server
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Simple static file serving for Railway
const publicPath = path.resolve(__dirname, 'dist', 'public');

console.log('Railway Production Server Starting...');
console.log('Working directory:', __dirname);
console.log('Static files path:', publicPath);
console.log('Directory exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
  console.log('Files in public:', fs.readdirSync(publicPath).slice(0, 10));
} else {
  console.error('ERROR: dist/public directory not found!');
  process.exit(1);
}

// Serve static files
app.use(express.static(publicPath));

// Fallback to index.html for SPA routing
app.use('*', (req, res) => {
  const indexPath = path.resolve(publicPath, 'index.html');
  console.log(`Serving ${req.originalUrl} -> index.html`);
  res.sendFile(indexPath);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Railway server running on port ${port}`);
  console.log(`Serving static files from: ${publicPath}`);
});