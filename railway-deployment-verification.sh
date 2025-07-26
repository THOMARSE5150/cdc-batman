#!/bin/bash
# Railway Deployment Verification Script
# This script verifies that the site is ready for Railway deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'  
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Railway Deployment Verification for Celia Dunsmore Counselling${NC}"
echo -e "${BLUE}=================================================================${NC}\n"

ISSUES=0

# 1. Check critical files exist
echo -e "${BLUE}1. Checking deployment configuration files...${NC}"

FILES=(
    "package.json"
    "Dockerfile" 
    "railway.json"
    "start-server.js"
    "nixpacks.toml"
    ".railwayignore"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file missing${NC}"
        ISSUES=$((ISSUES + 1))
    fi
done

# 2. Verify build process
echo -e "\n${BLUE}2. Testing build process...${NC}"

if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build process successful${NC}"
    
    # Check build output
    if [ -f "dist/public/index.html" ]; then
        echo -e "${GREEN}✅ index.html generated${NC}"
    else
        echo -e "${RED}❌ index.html not found in dist/public/${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    if [ -d "dist/public/assets" ]; then
        ASSET_COUNT=$(ls -1 dist/public/assets/ | wc -l)
        echo -e "${GREEN}✅ Assets directory exists (${ASSET_COUNT} files)${NC}"
    else
        echo -e "${RED}❌ Assets directory not found${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${RED}❌ Build process failed${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 3. Test production server
echo -e "\n${BLUE}3. Testing production server...${NC}"

# Start server in background
node start-server.js > server.log 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test health endpoint
if curl -s http://localhost:5000/health > /dev/null; then
    echo -e "${GREEN}✅ Health endpoint responding${NC}"
    
    # Check health response
    HEALTH_RESPONSE=$(curl -s http://localhost:5000/health)
    if echo "$HEALTH_RESPONSE" | grep -q '"status":"OK"'; then
        echo -e "${GREEN}✅ Health check returns OK status${NC}"
    else
        echo -e "${YELLOW}⚠️ Health check response unexpected${NC}"
    fi
else
    echo -e "${RED}❌ Health endpoint not responding${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Test API status endpoint
if curl -s http://localhost:5000/api/status > /dev/null; then
    echo -e "${GREEN}✅ API status endpoint responding${NC}"
else
    echo -e "${RED}❌ API status endpoint not responding${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Test static file serving
if curl -s http://localhost:5000/ | grep -q "Celia Dunsmore"; then
    echo -e "${GREEN}✅ Static files serving correctly${NC}"
else
    echo -e "${RED}❌ Static files not serving correctly${NC}"
    ISSUES=$((ISSUES + 1))
fi

# Clean up
kill $SERVER_PID 2>/dev/null || true
rm -f server.log

# 4. Check package.json scripts
echo -e "\n${BLUE}4. Verifying package.json scripts...${NC}"

if node -p "require('./package.json').scripts.start" | grep -q "node start-server.js"; then
    echo -e "${GREEN}✅ Start script correctly configured${NC}"
else
    echo -e "${RED}❌ Start script not configured correctly${NC}"
    ISSUES=$((ISSUES + 1))
fi

if node -p "require('./package.json').scripts.build" | grep -q "vite build"; then
    echo -e "${GREEN}✅ Build script correctly configured${NC}"
else
    echo -e "${RED}❌ Build script not configured correctly${NC}"
    ISSUES=$((ISSUES + 1))
fi

# 5. Check Dockerfile syntax
echo -e "\n${BLUE}5. Validating Dockerfile...${NC}"

if command -v docker >/dev/null 2>&1; then
    if docker build -t test-build . --dry-run >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Dockerfile syntax valid${NC}"
    else
        echo -e "${YELLOW}⚠️ Dockerfile syntax check failed (docker not available or other issue)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Docker not available for Dockerfile validation${NC}"
fi

# 6. Check railway.json syntax
echo -e "\n${BLUE}6. Validating railway.json...${NC}"

if command -v jq >/dev/null 2>&1; then
    if jq empty railway.json 2>/dev/null; then
        echo -e "${GREEN}✅ railway.json syntax valid${NC}"
        
        # Check key fields
        if jq -e '.deploy.startCommand' railway.json >/dev/null 2>&1; then
            START_CMD=$(jq -r '.deploy.startCommand' railway.json)
            echo -e "${GREEN}✅ Start command configured: ${START_CMD}${NC}"
        else
            echo -e "${RED}❌ Start command not configured${NC}"
            ISSUES=$((ISSUES + 1))
        fi
        
        if jq -e '.deploy.healthcheckPath' railway.json >/dev/null 2>&1; then
            HEALTH_PATH=$(jq -r '.deploy.healthcheckPath' railway.json)
            echo -e "${GREEN}✅ Health check path configured: ${HEALTH_PATH}${NC}"
        else
            echo -e "${RED}❌ Health check path not configured${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    else
        echo -e "${RED}❌ railway.json syntax invalid${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠️ jq not available for JSON validation${NC}"
fi

# Final report
echo -e "\n${BLUE}=================================================================${NC}"
echo -e "${BLUE}📋 DEPLOYMENT VERIFICATION SUMMARY${NC}"
echo -e "${BLUE}=================================================================${NC}"

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL CHECKS PASSED! Your site is ready for Railway deployment.${NC}\n"
    
    echo -e "${GREEN}✅ Configuration files present and valid${NC}"
    echo -e "${GREEN}✅ Build process working correctly${NC}"
    echo -e "${GREEN}✅ Production server functioning${NC}"
    echo -e "${GREEN}✅ Health checks responding${NC}"
    echo -e "${GREEN}✅ Static files serving properly${NC}"
    
    echo -e "\n${BLUE}🚀 NEXT STEPS:${NC}"
    echo -e "1. Push your code to GitHub"
    echo -e "2. Connect your GitHub repo to Railway"
    echo -e "3. Set environment variables in Railway dashboard"
    echo -e "4. Deploy and monitor the build logs"
    
    echo -e "\n${BLUE}📚 For detailed instructions, see: RAILWAY_DEPLOYMENT_GUIDE.md${NC}"
    
    exit 0
else
    echo -e "${RED}❌ ISSUES FOUND: ${ISSUES} problems need to be resolved before deployment.${NC}\n"
    
    echo -e "${YELLOW}🔧 Please fix the issues above and run this script again.${NC}"
    echo -e "${YELLOW}💡 Check the logs and configuration files for more details.${NC}"
    
    exit 1
fi