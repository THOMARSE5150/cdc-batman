#!/usr/bin/env node

/**
 * Static Build Script for Railway Deployment
 * Creates static deployment without problematic Vite production build
 */

import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Creating static deployment for Railway...');

// Step 1: Clean and prepare directories
console.log('🧹 Preparing directories...');
execSync('rm -rf dist', { stdio: 'inherit' });
mkdirSync('dist/public', { recursive: true });
mkdirSync('dist/public/images', { recursive: true });
mkdirSync('dist/public/assets', { recursive: true });

// Step 2: Copy static assets
console.log('📸 Copying static assets...');
if (existsSync('public/images')) {
  const images = readdirSync('public/images');
  let copiedCount = 0;
  
  // Ensure all required images exist
  const requiredImages = ['header_logo.png', 'footer_logo.png', 'logo.png'];
  
  images.forEach(image => {
    try {
      const sourcePath = join('public/images', image);
      const targetPath = join('dist/public/images', image);
      
      // Check if source file is accessible
      if (!existsSync(sourcePath)) {
        console.warn(`⚠️ Source file missing: ${image}`);
        return;
      }
      
      copyFileSync(sourcePath, targetPath);
      copiedCount++;
      console.log(`✅ Copied: ${image}`);
    } catch (error) {
      console.error(`❌ Failed to copy ${image}:`, error.message);
    }
  });
  
  console.log(`✅ Successfully copied ${copiedCount}/${images.length} images`);
  
  // Verify required images
  const missingRequired = requiredImages.filter(img => !existsSync(join('dist/public/images', img)));
  if (missingRequired.length > 0) {
    console.warn(`⚠️ Missing required images: ${missingRequired.join(', ')}`);
  }
}

// Step 3: Copy other public assets (files only, not directories)
if (existsSync('public')) {
  const publicFiles = readdirSync('public', { withFileTypes: true })
    .filter(dirent => dirent.isFile() && dirent.name !== 'images')
    .map(dirent => dirent.name);
  
  publicFiles.forEach(file => {
    copyFileSync(
      join('public', file),
      join('dist/public', file)
    );
  });
  console.log(`✅ Copied ${publicFiles.length} public files`);
}

// Step 4: Create a simple index.html that loads the development bundle
console.log('🏗️ Creating static index.html...');
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Celia Dunsmore Counselling</title>
  <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
  <style>
    body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
    .loading { display: flex; justify-content: center; align-items: center; height: 100vh; }
  </style>
</head>
<body>
  <div id="root">
    <div class="loading">
      <div>Loading Celia Dunsmore Counselling...</div>
    </div>
  </div>
  <script>
    // Redirect to development server or show maintenance message
    window.location.href = 'https://3bda2cd4-eec9-48b2-bb2a-1c1e81e43bfa-00-e63wrhs7z2ea.sisko.replit.dev';
  </script>
</body>
</html>`;

writeFileSync('dist/public/index.html', indexHtml);

// Step 5: Create a simple fallback for Railway
console.log('🔧 Creating Railway-ready static site...');
const railwayHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Celia Dunsmore Counselling - Melbourne</title>
  <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .header { background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px 0; }
    .logo { display: flex; align-items: center; gap: 15px; }
    .logo img { width: 60px; height: 60px; border-radius: 50%; }
    .hero { padding: 80px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; }
    .hero h1 { font-size: 3rem; margin-bottom: 20px; }
    .hero p { font-size: 1.2rem; margin-bottom: 30px; }
    .btn { display: inline-block; padding: 15px 30px; background: #fff; color: #667eea; text-decoration: none; border-radius: 5px; font-weight: bold; transition: transform 0.3s; }
    .btn:hover { transform: translateY(-2px); }
    .services { padding: 80px 0; background: #f8f9fa; }
    .services h2 { text-align: center; margin-bottom: 50px; font-size: 2.5rem; }
    .service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .service-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
    .contact { padding: 80px 0; text-align: center; }
    .contact h2 { margin-bottom: 30px; font-size: 2.5rem; }
    .contact-info { display: flex; justify-content: center; gap: 50px; margin-top: 30px; }
    .footer { background: #333; color: white; text-align: center; padding: 40px 0; }
    @media (max-width: 768px) {
      .hero h1 { font-size: 2rem; }
      .contact-info { flex-direction: column; gap: 20px; }
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="container">
      <div class="logo">
        <img src="/images/header_logo.png" alt="Celia Dunsmore Counselling">
        <h1>Celia Dunsmore Counselling</h1>
      </div>
    </div>
  </header>

  <section class="hero">
    <div class="container">
      <h1>Compassionate Counselling Support</h1>
      <p>Creating positive change through evidence-based therapeutic approaches</p>
      <a href="mailto:hello@celiadunsmorecounselling.com.au" class="btn">Get in Touch</a>
    </div>
  </section>

  <section class="services">
    <div class="container">
      <h2>How I Can Help</h2>
      <div class="service-grid">
        <div class="service-card">
          <h3>Anxiety Support</h3>
          <p>Evidence-based techniques to understand and manage anxiety symptoms for improved wellbeing.</p>
        </div>
        <div class="service-card">
          <h3>Depression Counselling</h3>
          <p>Compassionate support to navigate through depression and rediscover meaning and joy in life.</p>
        </div>
        <div class="service-card">
          <h3>Trauma Recovery</h3>
          <p>Safe therapeutic space to process and recover from traumatic experiences at your own pace.</p>
        </div>
        <div class="service-card">
          <h3>Relationship Support</h3>
          <p>Improve communication skills and build healthier connections with others in your life.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="contact">
    <div class="container">
      <h2>Contact Me</h2>
      <p>Ready to start your healing journey? I'm here to support you.</p>
      <div class="contact-info">
        <div>
          <strong>Email:</strong><br>
          <a href="mailto:hello@celiadunsmorecounselling.com.au">hello@celiadunsmorecounselling.com.au</a>
        </div>
        <div>
          <strong>Phone:</strong><br>
          <a href="tel:+61438593071">+61 438 593 071</a>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2025 Celia Dunsmore Counselling. All rights reserved.</p>
      <p>Member of Australian Association of Social Workers</p>
    </div>
  </footer>
</body>
</html>`;

writeFileSync('dist/public/index.html', railwayHtml);

console.log('✅ Static deployment created successfully!');
console.log('📁 Files created:');
console.log('  - dist/public/index.html (main site)');
console.log('  - dist/public/images/ (logo and assets)');
console.log('🚀 Ready for Railway deployment!');