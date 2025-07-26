#!/usr/bin/env node

/**
 * Immediate Railway Deployment Fix
 * Creates working static deployment that matches your live site
 */

import { writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Creating immediate Railway deployment fix...');

// Step 1: Clean and prepare
mkdirSync('dist/public', { recursive: true });
mkdirSync('dist/public/images', { recursive: true });
mkdirSync('dist/public/assets', { recursive: true });

// Step 2: Copy all assets  
if (existsSync('public/images')) {
  const images = readdirSync('public/images');
  images.forEach(image => {
    copyFileSync(
      join('public/images', image),
      join('dist/public/images', image)
    );
  });
  console.log(`✅ Copied ${images.length} images including header_logo.png`);
}

// Step 3: Create a working website that matches your live site structure
const workingSite = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Celia Dunsmore Counselling - Professional Mental Health Support Melbourne</title>
  <meta name="description" content="Compassionate counselling services in Melbourne. Evidence-based therapy for anxiety, depression, trauma, and relationship support. Book your consultation today.">
  <link rel="icon" href="/images/favicon.ico" type="image/x-icon">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    /* Reset and base styles */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
      line-height: 1.6; 
      color: #1a1a1a; 
      background: #ffffff;
    }
    
    /* Header matching your live site */
    .header { 
      background: #ffffff; 
      box-shadow: 0 2px 20px rgba(0,0,0,0.05); 
      padding: 20px 0; 
      position: sticky; 
      top: 0; 
      z-index: 100; 
    }
    .header-content { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 20px; 
      display: flex; 
      align-items: center; 
      gap: 20px; 
    }
    .logo { 
      width: 60px; 
      height: 60px; 
      border-radius: 50%; 
      object-fit: cover; 
      border: 3px solid #667eea; 
    }
    .brand-text h1 { 
      font-size: 1.5rem; 
      font-weight: 600; 
      color: #667eea; 
      margin-bottom: 2px; 
    }
    .brand-text p { 
      font-size: 0.9rem; 
      color: #666; 
      font-weight: 400; 
    }
    
    /* Navigation matching your live site */
    .nav { 
      margin-left: auto; 
      display: flex; 
      gap: 30px; 
    }
    .nav a { 
      text-decoration: none; 
      color: #555; 
      font-weight: 500; 
      padding: 8px 16px; 
      border-radius: 8px; 
      transition: all 0.3s ease; 
    }
    .nav a:hover { 
      background: #667eea; 
      color: white; 
    }
    
    /* Hero Section matching your live site exactly */
    .hero { 
      padding: 100px 0; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white; 
      text-align: center; 
    }
    .hero-content { 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 0 20px; 
    }
    .hero h1 { 
      font-size: 3.5rem; 
      font-weight: 700; 
      margin-bottom: 20px; 
      line-height: 1.2; 
    }
    .hero p { 
      font-size: 1.3rem; 
      margin-bottom: 40px; 
      opacity: 0.95; 
      font-weight: 300; 
    }
    .cta-button { 
      display: inline-block; 
      padding: 18px 40px; 
      background: #ffffff; 
      color: #667eea; 
      text-decoration: none; 
      border-radius: 12px; 
      font-weight: 600; 
      font-size: 1.1rem; 
      transition: all 0.3s ease; 
      box-shadow: 0 8px 30px rgba(255,255,255,0.3); 
    }
    .cta-button:hover { 
      transform: translateY(-3px); 
      box-shadow: 0 12px 40px rgba(255,255,255,0.4); 
    }
    
    /* Services Section matching your live site */
    .services { 
      padding: 100px 0; 
      background: #f8fafc; 
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 20px; 
    }
    .section-title { 
      text-align: center; 
      margin-bottom: 60px; 
    }
    .section-title h2 { 
      font-size: 2.8rem; 
      font-weight: 700; 
      color: #1a1a1a; 
      margin-bottom: 15px; 
    }
    .section-title p { 
      font-size: 1.2rem; 
      color: #666; 
      max-width: 600px; 
      margin: 0 auto; 
    }
    
    .services-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
      gap: 40px; 
    }
    .service-card { 
      background: white; 
      padding: 40px; 
      border-radius: 16px; 
      box-shadow: 0 8px 30px rgba(0,0,0,0.08); 
      transition: all 0.3s ease; 
      border: 1px solid #e2e8f0; 
    }
    .service-card:hover { 
      transform: translateY(-8px); 
      box-shadow: 0 20px 60px rgba(0,0,0,0.12); 
    }
    .service-icon { 
      width: 60px; 
      height: 60px; 
      background: linear-gradient(135deg, #667eea, #764ba2); 
      border-radius: 12px; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      margin-bottom: 20px; 
      color: white; 
      font-size: 1.5rem; 
    }
    .service-card h3 { 
      font-size: 1.4rem; 
      font-weight: 600; 
      margin-bottom: 15px; 
      color: #1a1a1a; 
    }
    .service-card p { 
      color: #666; 
      line-height: 1.7; 
    }
    
    /* About Section */
    .about { 
      padding: 100px 0; 
      background: #ffffff; 
    }
    .about-content { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 60px; 
      align-items: center; 
    }
    .about-text h2 { 
      font-size: 2.8rem; 
      font-weight: 700; 
      margin-bottom: 20px; 
      color: #1a1a1a; 
    }
    .about-text p { 
      color: #666; 
      margin-bottom: 20px; 
      line-height: 1.7; 
    }
    .qualifications { 
      background: #f8fafc; 
      padding: 30px; 
      border-radius: 12px; 
      margin-top: 30px; 
    }
    .qualifications h4 { 
      color: #667eea; 
      margin-bottom: 15px; 
      font-weight: 600; 
    }
    .qualifications ul { 
      list-style: none; 
    }
    .qualifications li { 
      padding: 5px 0; 
      color: #666; 
    }
    .qualifications li:before { 
      content: "✓ "; 
      color: #667eea; 
      font-weight: bold; 
    }
    
    /* Locations Section */
    .locations { 
      padding: 100px 0; 
      background: #f8fafc; 
    }
    .locations-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
      gap: 40px; 
    }
    .location-card { 
      background: white; 
      padding: 40px; 
      border-radius: 16px; 
      box-shadow: 0 8px 30px rgba(0,0,0,0.08); 
      transition: all 0.3s ease; 
    }
    .location-card:hover { 
      transform: translateY(-5px); 
      box-shadow: 0 20px 50px rgba(0,0,0,0.12); 
    }
    .location-card h3 { 
      color: #667eea; 
      margin-bottom: 10px; 
      font-size: 1.3rem; 
    }
    .location-card p { 
      color: #666; 
      line-height: 1.6; 
    }
    
    /* Contact Section */
    .contact { 
      padding: 100px 0; 
      background: #1a1a1a; 
      color: white; 
    }
    .contact-content { 
      text-align: center; 
      max-width: 800px; 
      margin: 0 auto; 
    }
    .contact h2 { 
      font-size: 2.8rem; 
      font-weight: 700; 
      margin-bottom: 20px; 
    }
    .contact p { 
      font-size: 1.2rem; 
      margin-bottom: 50px; 
      opacity: 0.9; 
    }
    .contact-info { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
      gap: 40px; 
      margin-top: 60px; 
    }
    .contact-item { 
      text-align: center; 
      padding: 30px; 
      background: rgba(255,255,255,0.05); 
      border-radius: 12px; 
      border: 1px solid rgba(255,255,255,0.1); 
    }
    .contact-item h4 { 
      font-size: 1.2rem; 
      margin-bottom: 10px; 
      color: #667eea; 
    }
    .contact-btn { 
      display: inline-block; 
      padding: 15px 30px; 
      background: #667eea; 
      color: white; 
      text-decoration: none; 
      border-radius: 8px; 
      margin-top: 20px; 
      transition: all 0.3s ease; 
    }
    .contact-btn:hover { 
      background: #5a6fd8; 
      transform: translateY(-2px); 
    }
    
    /* Footer */
    .footer { 
      background: #0a0a0a; 
      color: white; 
      text-align: center; 
      padding: 60px 0; 
    }
    .footer-content { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 20px; 
    }
    .footer-logo { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      gap: 15px; 
      margin-bottom: 30px; 
    }
    .footer-logo img { 
      width: 50px; 
      height: 50px; 
      border-radius: 50%; 
    }
    .acknowledgment { 
      background: rgba(255,255,255,0.05); 
      padding: 30px; 
      border-radius: 12px; 
      margin: 40px 0; 
      border-left: 4px solid #667eea; 
    }
    .acknowledgment p { 
      font-style: italic; 
      margin-bottom: 10px; 
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .nav { display: none; }
      .services-grid { grid-template-columns: 1fr; }
      .about-content { grid-template-columns: 1fr; gap: 40px; }
      .contact-info { grid-template-columns: 1fr; }
      .locations-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="header-content">
      <img src="/images/header_logo.png" alt="Celia Dunsmore Counselling" class="logo">
      <div class="brand-text">
        <h1>Celia Dunsmore Counselling</h1>
        <p>Professional Mental Health Support</p>
      </div>
      <nav class="nav">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#locations">Locations</a>
        <a href="#contact">Contact</a>
        <a href="#contact" style="background: #667eea; color: white;">Book Now</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>Creating positive change through compassionate counselling</h1>
      <p>Non-judgmental and compassionate attunement style of counselling to help you achieve and experience your therapy goals.</p>
      <a href="#contact" class="cta-button">Enquire About Counselling With Celia</a>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="about">
    <div class="container">
      <div class="about-content">
        <div class="about-text">
          <h2>Meet Celia Dunsmore</h2>
          <p>I am an Accredited Mental Health Social Worker and feel deeply passionate about supporting people aged 16 and up to create positive change in their lives. I provide a non-judgmental, safe space for clients to feel heard and understood. I carefully attune to the person and help them achieve their goals for therapy.</p>
          
          <div class="qualifications">
            <h4>My Qualifications</h4>
            <ul>
              <li>Bachelor of Arts, The University of Melbourne</li>
              <li>Bachelor of Social Work, RMIT University</li>
              <li>Master of Counselling, La Trobe University</li>
            </ul>
          </div>
        </div>
        <div class="about-image">
          <img src="/images/celia-portrait.png" alt="Celia Dunsmore" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.1);">
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section id="services" class="services">
    <div class="container">
      <div class="section-title">
        <h2>How I Can Help</h2>
        <p>Discover how I can support you to wellness, treating the following difficulties through counselling</p>
      </div>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">🌱</div>
          <h3>Anxiety</h3>
          <p>Supporting you to understand and manage anxiety symptoms for improved wellbeing.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">💙</div>
          <h3>Depression</h3>
          <p>Helping you navigate through depression and find meaning and joy in your life.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🌟</div>
          <h3>Trauma and Complex Relational Trauma</h3>
          <p>Creating a safe space and therapeutic alliance to process and recover from past traumatic experiences.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🎯</div>
          <h3>Emotional Dysregulation</h3>
          <p>Deepening self awareness to manage difficult emotions.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🤝</div>
          <h3>Interpersonal Difficulties</h3>
          <p>Improving your relationships and communication with others.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">✨</div>
          <h3>Low Self Esteem</h3>
          <p>Connecting with and accepting your authentic self unconditionally.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🍃</div>
          <h3>Disordered Eating and Negative Body Image</h3>
          <p>Supporting you to develop a healthier relationship with food and your body.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">⚖️</div>
          <h3>Perfectionism</h3>
          <p>Learning to harness perfectionism as a healthy trait.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">💔</div>
          <h3>Grief and Loss</h3>
          <p>Supporting you through periods of grief and significant loss.</p>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🔄</div>
          <h3>Life Transitions and Adjustment Issues</h3>
          <p>Supporting you through major life changes and transitions, including adjustment to diagnosis.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Locations Section -->
  <section id="locations" class="locations">
    <div class="container">
      <div class="section-title">
        <h2>Practice Locations</h2>
        <p>You can choose from three convenient locations in Coburg or Brunswick or via Telehealth</p>
      </div>
      
      <div class="locations-grid">
        <div class="location-card">
          <h3>Brunswick - Primary Location</h3>
          <p>503 Sydney Road, Brunswick VIC 3056</p>
          <p>Ample parking close by, 19 Sydney road tram nearby</p>
        </div>
        
        <div class="location-card">
          <h3>Coburg - Bell Street</h3>
          <p>81B Bell Street, Coburg VIC 3058</p>
          <p>Ample parking close by, 19 Sydney road tram nearby</p>
        </div>
        
        <div class="location-card">
          <h3>Coburg - Solana Psychology</h3>
          <p>FL 1, 420 Sydney Road, Coburg VIC 3058</p>
          <p>Ample parking close by, 19 Sydney road tram nearby</p>
        </div>
        
        <div class="location-card">
          <h3>Telehealth</h3>
          <p>Available for your convenience</p>
          <p>Contact Celia to book first session at location of choice</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="contact">
    <div class="container">
      <div class="contact-content">
        <h2>Start Your Healing Journey</h2>
        <p>Ready to take the first step? I'm here to support you on your journey to better mental health.</p>
        
        <div class="contact-info">
          <div class="contact-item">
            <h4>Email</h4>
            <p>hello@celiadunsmorecounselling.com.au</p>
            <a href="mailto:hello@celiadunsmorecounselling.com.au?subject=Appointment%20Request" class="contact-btn">Send Email</a>
          </div>
          
          <div class="contact-item">
            <h4>Phone</h4>
            <p>+61 438 593 071</p>
            <a href="tel:+61438593071" class="contact-btn">Call Now</a>
          </div>
          
          <div class="contact-item">
            <h4>Session Fees</h4>
            <p>$225.57 per session</p>
            <p>$140.37 after Medicare rebate</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="/images/header_logo.png" alt="Celia Dunsmore Counselling">
        <div>
          <h3>Celia Dunsmore Counselling</h3>
          <p>Professional Mental Health Support</p>
        </div>
      </div>
      
      <div class="acknowledgment">
        <p>I acknowledge the Traditional Owners of the land on which I work and live, and pay my respects to Elders past, present and emerging.</p>
      </div>
      
      <p>&copy; 2025 Celia Dunsmore Counselling. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;

writeFileSync('dist/public/index.html', workingSite);

// Create additional required files
writeFileSync('dist/public/robots.txt', `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://celiadunsmorecounselling.com.au/sitemap.xml`);

writeFileSync('dist/public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url><loc>https://celiadunsmorecounselling.com.au/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/services</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/locations</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/contact</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);

console.log('✅ Working static site created!');
console.log('🎉 Railway deployment ready - this will display correctly!');