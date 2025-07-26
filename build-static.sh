#!/bin/bash

# Exit on error
set -e

echo "Starting static build process..."

# Clean existing build folders
rm -rf dist
mkdir -p dist/public

# Set environment to static for the build
export VITE_STATIC_DEPLOYMENT=true

# Build the frontend only using Vite
echo "Building frontend..."
npx vite build --outDir dist/public

# Copy sitemap.xml directly to ensure it's available and properly served
cp public/sitemap.xml dist/public/sitemap.xml

# Create a basic _redirects file for Netlify-compatible hosting
echo "/* /index.html 200" > dist/public/_redirects
# Make sure the sitemap isn't redirected by Netlify
echo "/sitemap.xml /sitemap.xml 200" >> dist/public/_redirects

# Create a basic netlify.toml file for better compatibility
cat > dist/public/netlify.toml << EOL
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOL

# Create a basic vercel.json file for Vercel compatibility
cat > dist/public/vercel.json << EOL
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOL

# Create a replit.json specifically for Replit static deployments
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

# Create a basic now.json for legacy Now.sh compatibility
cat > dist/public/now.json << EOL
{
  "version": 2,
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOL

# Create a web.config file for IIS/Azure hosting
cat > dist/public/web.config << EOL
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
EOL

# Create a 404.html that redirects to index.html (for GitHub Pages)
cat > dist/public/404.html << EOL
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // Single Page Apps for GitHub Pages
    // https://github.com/rafgraph/spa-github-pages
    // This script redirects to the main page for 404 errors on single page apps hosted on GitHub Pages
    
    var pathSegmentsToKeep = 0;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  Redirecting to the homepage...
</body>
</html>
EOL

# Add script to index.html to handle GitHub Pages redirects
if grep -q "GitHub Pages redirect script" dist/public/index.html; then
  echo "GitHub Pages redirect script already exists in index.html"
else
  sed -i '/<head>/a \
  <!-- GitHub Pages redirect script -->\
  <script type="text/javascript">\
    (function(l) {\
      if (l.search[1] === "/") {\
        var decoded = l.search.slice(1).split("&").map(function(s) { \
          return s.replace(/~and~/g, "&")\
        }).join("?");\
        window.history.replaceState(null, null,\
          l.pathname.slice(0, -1) + decoded + l.hash\
        );\
      }\
    }(window.location))\
  </script>' dist/public/index.html || echo "Failed to insert GitHub Pages redirect script, continuing anyway"
fi

echo "Static build completed successfully!"
echo "The static website files are in the dist/public directory"
echo "These files are now ready for deployment to any static hosting service"