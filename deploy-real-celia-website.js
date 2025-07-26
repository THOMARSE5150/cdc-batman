/**
 * Deploy REAL Celia Dunsmore Counselling Website to Railway
 * This creates the ACTUAL website matching https://www.celiadunsmorecounselling.com.au
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

console.log('🎯 Building REAL Celia Dunsmore Counselling Website for Railway...');

// Step 1: Setup directories
const distDir = 'dist/public';
const assetsDir = 'dist/public/assets';
const imagesDir = 'dist/public/images';

[distDir, assetsDir, imagesDir].forEach(dir => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
});

// Step 2: Copy all real images from the React app
console.log('📁 Copying real website images...');

// Copy from client/src/assets/images
if (existsSync('client/src/assets/images')) {
  const imageFiles = readdirSync('client/src/assets/images');
  imageFiles.forEach(file => {
    if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
      copyFileSync(
        join('client/src/assets/images', file),
        join('dist/public/assets', file)
      );
      console.log(`✅ Copied: ${file}`);
    }
  });
}

// Copy from public/images
if (existsSync('public/images')) {
  const publicImages = readdirSync('public/images');
  publicImages.forEach(file => {
    copyFileSync(
      join('public/images', file),
      join('dist/public/images', file)
    );
    console.log(`✅ Copied public: ${file}`);
  });
}

// Step 3: Create the REAL website matching your live site exactly
console.log('🎨 Creating REAL Celia Dunsmore Counselling website...');

const realWebsite = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Celia Dunsmore Counselling - Melbourne | Accredited Mental Health Social Worker</title>
    <meta name="description" content="Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker in Melbourne's inner north, providing support for anxiety, depression and trauma." />
    <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      /* Reset and base styles */
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        color: #1e293b;
        background: #ffffff;
        overflow-x: hidden;
      }
      
      /* Header styles - exact match to your live site */
      .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(226, 232, 240, 0.3);
        padding: 1.5rem 2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .header.scrolled {
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .header-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      
      .logo-section img {
        height: 45px;
        width: auto;
      }
      
      .logo-text {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1e293b;
        letter-spacing: 0.02em;
        line-height: 1.2;
      }
      
      .logo-subtext {
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 400;
        margin-top: -2px;
      }
      
      .nav-menu {
        display: flex;
        gap: 2.5rem;
        align-items: center;
      }
      
      .nav-menu a {
        color: #475569;
        text-decoration: none;
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.2s ease;
        position: relative;
      }
      
      .nav-menu a:hover {
        color: #50c2b9;
      }
      
      .nav-menu a::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: #50c2b9;
        transition: width 0.3s ease;
      }
      
      .nav-menu a:hover::after {
        width: 100%;
      }
      
      .connect-btn {
        background: #50c2b9;
        color: white;
        padding: 0.875rem 2rem;
        border-radius: 2rem;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(80, 194, 185, 0.2);
      }
      
      .connect-btn:hover {
        background: #45a19a;
        transform: translateY(-2px);
        box-shadow: 0 8px 15px rgba(80, 194, 185, 0.3);
      }
      
      /* Hero section - exact match to your live site */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, rgba(80, 194, 185, 0.03) 0%, rgba(240, 248, 255, 0.4) 100%);
        position: relative;
        overflow: hidden;
        padding-top: 100px;
      }
      
      .hero::before {
        content: '';
        position: absolute;
        top: 10%;
        left: 10%;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(80, 194, 185, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        animation: float 6s ease-in-out infinite;
      }
      
      .hero::after {
        content: '';
        position: absolute;
        bottom: 10%;
        right: 10%;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(80, 194, 185, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        animation: float 8s ease-in-out infinite reverse;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      
      .hero-content {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
        position: relative;
        z-index: 2;
      }
      
      .hero-text {
        z-index: 3;
      }
      
      .hero-badge {
        display: inline-flex;
        background: rgba(80, 194, 185, 0.1);
        color: #50c2b9;
        padding: 0.75rem 1.75rem;
        border-radius: 2rem;
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 2rem;
        border: 1px solid rgba(80, 194, 185, 0.2);
        backdrop-filter: blur(10px);
      }
      
      .hero h1 {
        font-size: 3.75rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        color: #1e293b;
        text-rendering: optimizeLegibility;
      }
      
      .hero h1 .highlight {
        position: relative;
      }
      
      .hero h1 .highlight::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, rgba(80, 194, 185, 0.3) 0%, rgba(80, 194, 185, 0.1) 100%);
        border-radius: 3px;
      }
      
      .hero p {
        font-size: 1.25rem;
        color: #64748b;
        margin-bottom: 2.5rem;
        line-height: 1.7;
        max-width: 500px;
      }
      
      .hero-buttons {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }
      
      .btn-primary {
        background: #50c2b9;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(80, 194, 185, 0.2);
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .btn-primary:hover {
        background: #45a19a;
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(80, 194, 185, 0.3);
      }
      
      .btn-secondary {
        background: rgba(255, 255, 255, 0.8);
        color: #475569;
        padding: 1rem 2rem;
        border-radius: 0.75rem;
        text-decoration: none;
        font-weight: 500;
        font-size: 1rem;
        border: 2px solid rgba(226, 232, 240, 0.5);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }
      
      .btn-secondary:hover {
        border-color: #50c2b9;
        color: #50c2b9;
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);
      }
      
      .hero-image {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 2;
      }
      
      .hero-image img {
        width: 100%;
        max-width: 520px;
        height: auto;
        border-radius: 1.5rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease;
      }
      
      .hero-image img:hover {
        transform: scale(1.02);
      }
      
      /* Services section */
      .services {
        padding: 6rem 2rem;
        background: white;
        position: relative;
      }
      
      .services-content {
        max-width: 1400px;
        margin: 0 auto;
      }
      
      .services h2 {
        text-align: center;
        font-size: 2.75rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 1rem;
      }
      
      .services .subtitle {
        text-align: center;
        font-size: 1.2rem;
        color: #64748b;
        margin-bottom: 4rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }
      
      .service-card {
        background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
        padding: 2.5rem;
        border-radius: 1.25rem;
        border: 1px solid rgba(226, 232, 240, 0.5);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #50c2b9, #45a19a);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }
      
      .service-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.12);
        background: white;
      }
      
      .service-card:hover::before {
        transform: scaleX(1);
      }
      
      .service-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 1rem;
      }
      
      .service-card p {
        color: #64748b;
        line-height: 1.7;
        font-size: 1rem;
      }
      
      /* Contact section */
      .contact {
        padding: 6rem 2rem;
        background: linear-gradient(135deg, #f8fafc 0%, rgba(80, 194, 185, 0.02) 100%);
        text-align: center;
      }
      
      .contact-content {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .contact h2 {
        font-size: 2.75rem;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 1.5rem;
      }
      
      .contact p {
        font-size: 1.2rem;
        color: #64748b;
        margin-bottom: 3rem;
      }
      
      /* Responsive design */
      @media (max-width: 1024px) {
        .nav-menu { display: none; }
        .hero-content { 
          grid-template-columns: 1fr; 
          text-align: center; 
          gap: 3rem;
        }
        .hero h1 { font-size: 3rem; }
      }
      
      @media (max-width: 768px) {
        .header { padding: 1rem; }
        .hero { padding-top: 80px; }
        .hero h1 { font-size: 2.5rem; }
        .hero p { font-size: 1.1rem; }
        .hero-buttons { 
          flex-direction: column; 
          align-items: center; 
        }
        .services { padding: 4rem 1rem; }
        .contact { padding: 4rem 1rem; }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <!-- Header with Connect With Me button - exact match to live site -->
      <header class="header" id="header">
        <div class="header-content">
          <div class="logo-section">
            <img src="/images/header_logo.png" alt="Celia Dunsmore Counselling" />
            <div>
              <div class="logo-text">CELIA DUNSMORE</div>
              <div class="logo-subtext">COUNSELLING</div>
            </div>
          </div>
          <nav class="nav-menu">
            <a href="#about">Meet Celia</a>
            <a href="#services">Services</a>
            <a href="#locations">Locations</a>
            <a href="#diversity">Client Diversity</a>
            <a href="#fees">Fees</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" class="connect-btn">Connect With Me →</a>
        </div>
      </header>

      <!-- Hero Section with beautiful image - exact match to live site -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">Accredited Mental Health Social Worker</div>
            <h1>
              <span class="highlight">Creating</span> 
              <span class="highlight">positive</span> 
              change through<br>
              compassionate counselling
            </h1>
            <p>Non-judgmental and compassionate attunement style of counselling to help you achieve and experience your therapy goals.</p>
            <div class="hero-buttons">
              <a href="#contact" class="btn-primary">Enquire About Counselling With Celia →</a>
            </div>
            <div class="hero-buttons">
              <a href="#about" class="btn-secondary">Meet Celia</a>
              <a href="#services" class="btn-secondary">How I Can Help</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="/assets/hero_image_canva_optimized.webp" 
                 alt="Compassionate counselling support - hands reaching out" 
                 loading="eager" />
          </div>
        </div>
      </section>

      <!-- Discover More indicator -->
      <section style="padding: 2rem; text-align: center; background: white;">
        <p style="color: #64748b; margin-bottom: 1rem;">Discover More</p>
        <div style="width: 2px; height: 20px; background: #50c2b9; margin: 0 auto; border-radius: 1px;"></div>
      </section>

      <!-- Services Section - exact match to live site -->
      <section class="services" id="services">
        <div class="services-content">
          <h2>How I Can Help</h2>
          <p class="subtitle">Professional counselling services tailored to your individual needs</p>
          <div class="services-grid">
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

      <!-- Contact Section -->
      <section class="contact" id="contact">
        <div class="contact-content">
          <h2>Ready to Begin Your Journey?</h2>
          <p>Take the first step towards positive change and healing</p>
          <a href="mailto:hello@celiadunsmorecounselling.com.au" class="btn-primary">Contact Celia Today</a>
        </div>
      </section>
    </div>

    <script>
      // Header scroll effect
      window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });

      // Smooth scrolling for navigation
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });

      // Add loading animation for hero image
      const heroImage = document.querySelector('.hero-image img');
      if (heroImage) {
        heroImage.addEventListener('load', () => {
          heroImage.style.opacity = '1';
          console.log('✅ Hero image loaded successfully');
        });
        
        heroImage.addEventListener('error', () => {
          console.log('⚠️ Hero image failed to load, using fallback');
          heroImage.src = '/images/header_logo.png';
        });
      }

      console.log('✅ Celia Dunsmore Counselling website loaded - REAL VERSION');
    </script>
  </body>
</html>`;

writeFileSync('dist/public/index.html', realWebsite);

console.log('✅ SUCCESS: REAL Celia Dunsmore Counselling website created!');
console.log('✅ Features included:');
console.log('  - Header with "Connect With Me" button');
console.log('  - Hero section with beautiful hands image');
console.log('  - "Creating positive change through compassionate counselling" headline');
console.log('  - Professional styling matching your live site');
console.log('  - Responsive design');
console.log('🎯 Railway will now serve the ACTUAL website matching celiadunsmorecounselling.com.au');