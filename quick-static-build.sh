#!/bin/bash

# Exit on error
set -e

echo "Creating minimal static deployment..."

# Clean existing build folders
rm -rf dist
mkdir -p dist/public

# Copy the public directory contents
cp -r public/* dist/public/ 2>/dev/null || true

# Create a basic index.html file
cat > dist/public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Celia Dunsmore Counselling</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f5f2;
      color: #2d2926;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background-color: #436a73;
      color: white;
      padding: 20px;
      text-align: center;
    }
    main {
      flex: 1;
      padding: 30px;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }
    h1 {
      color: #436a73;
      margin-bottom: 20px;
    }
    p {
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .cta {
      background-color: #436a73;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      font-weight: bold;
      display: inline-block;
      margin-top: 20px;
    }
    footer {
      background-color: #2d2926;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Celia Dunsmore Counselling</h1>
  </header>
  <main>
    <h2>Welcome to Our Counselling Services</h2>
    <p>
      We provide compassionate, personalized counselling services to help you navigate life's challenges. 
      Our approach is centered on your unique needs and goals.
    </p>
    <p>
      This is a temporary static page. The full website is currently being prepared for deployment.
    </p>
    <a href="mailto:info@celiadunsmoorecounselling.com.au" class="cta">Contact Us</a>
  </main>
  <footer>
    <p>&copy; 2025 Celia Dunsmore Counselling. All rights reserved.</p>
  </footer>
</body>
</html>
EOL

# Create a routing config file
cat > dist/public/_redirects << EOL
/* /index.html 200
EOL

# Create a replit.json file
cat > dist/public/replit.json << EOL
{
  "routing": {
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/index.html"
      }
    ]
  }
}
EOL

# Create a routing.json at the root
cat > routing.json << EOL
{
  "routes": [
    {
      "src": "^/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOL

echo "Static build completed successfully!"
echo "The static files are in the dist/public directory"
echo "You can now deploy using 'dist/public' as your public directory"