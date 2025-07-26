#!/bin/bash

# Railway Deployment Verification Script
# Comprehensive check for Railway deployment readiness

echo "🚀 Railway Deployment Verification"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track issues
ISSUES=0

echo -e "\n📋 Checking Railway Configuration..."

# 1. Check railway.json
if [ -f "railway.json" ]; then
    echo -e "${GREEN}✅ railway.json exists${NC}"
    
    # Validate JSON syntax
    if jq empty railway.json 2>/dev/null; then
        echo -e "${GREEN}✅ railway.json is valid JSON${NC}"
    else
        echo -e "${RED}❌ railway.json has invalid JSON syntax${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    # Check required fields
    if jq -e '.build.builder' railway.json >/dev/null 2>&1; then
        BUILDER=$(jq -r '.build.builder' railway.json)
        echo -e "${GREEN}✅ Builder configured: ${BUILDER}${NC}"
    else
        echo -e "${RED}❌ No builder specified in railway.json${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    if jq -e '.deploy.startCommand' railway.json >/dev/null 2>&1; then
        START_CMD=$(jq -r '.deploy.startCommand' railway.json)
        echo -e "${GREEN}✅ Start command: ${START_CMD}${NC}"
    else
        echo -e "${RED}❌ No start command specified${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    if jq -e '.deploy.healthcheckPath' railway.json >/dev/null 2>&1; then
        HEALTH_PATH=$(jq -r '.deploy.healthcheckPath' railway.json)
        echo -e "${GREEN}✅ Health check path: ${HEALTH_PATH}${NC}"
    else
        echo -e "${YELLOW}⚠️ No health check path specified${NC}"
    fi
else
    echo -e "${RED}❌ railway.json not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

echo -e "\n🐳 Checking Dockerfile..."

# 2. Check Dockerfile
if [ -f "Dockerfile" ]; then
    echo -e "${GREEN}✅ Dockerfile exists${NC}"
    
    # Check for multi-stage vs single-stage
    if grep -q "FROM.*AS" Dockerfile; then
        echo -e "${YELLOW}⚠️ Multi-stage Dockerfile detected${NC}"
    else
        echo -e "${GREEN}✅ Single-stage Dockerfile (Railway optimized)${NC}"
    fi
    
    # Check for Railway best practices
    if grep -q "dumb-init\|tini" Dockerfile; then
        echo -e "${GREEN}✅ Signal handling configured${NC}"
    else
        echo -e "${YELLOW}⚠️ No signal handling (dumb-init/tini) found${NC}"
    fi
    
    if grep -q "HEALTHCHECK" Dockerfile; then
        echo -e "${GREEN}✅ Health check in Dockerfile${NC}"
    else
        echo -e "${YELLOW}⚠️ No HEALTHCHECK in Dockerfile${NC}"
    fi
    
    if grep -q "adduser\|addgroup" Dockerfile; then
        echo -e "${GREEN}✅ Non-root user configured${NC}"
    else
        echo -e "${YELLOW}⚠️ No non-root user configuration${NC}"
    fi
else
    echo -e "${RED}❌ Dockerfile not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

echo -e "\n📦 Checking Package Configuration..."

# 3. Check package.json
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json exists${NC}"
    
    # Check start script
    if jq -e '.scripts.start' package.json >/dev/null 2>&1; then
        PKG_START=$(jq -r '.scripts.start' package.json)
        echo -e "${GREEN}✅ Start script: ${PKG_START}${NC}"
        
        # Check alignment with railway.json
        if [ -f "railway.json" ] && jq -e '.deploy.startCommand' railway.json >/dev/null 2>&1; then
            RAILWAY_START=$(jq -r '.deploy.startCommand' railway.json)
            if [ "$PKG_START" = "$RAILWAY_START" ]; then
                echo -e "${GREEN}✅ Start commands aligned${NC}"
            else
                echo -e "${RED}❌ Start command mismatch:${NC}"
                echo -e "   package.json: ${PKG_START}"
                echo -e "   railway.json: ${RAILWAY_START}"
                ISSUES=$((ISSUES + 1))
            fi
        fi
    else
        echo -e "${RED}❌ No start script in package.json${NC}"
        ISSUES=$((ISSUES + 1))
    fi
    
    # Check build script
    if jq -e '.scripts.build' package.json >/dev/null 2>&1; then
        BUILD_CMD=$(jq -r '.scripts.build' package.json)
        echo -e "${GREEN}✅ Build script: ${BUILD_CMD}${NC}"
    else
        echo -e "${YELLOW}⚠️ No build script found${NC}"
    fi
else
    echo -e "${RED}❌ package.json not found${NC}"
    ISSUES=$((ISSUES + 1))
fi

echo -e "\n🏥 Checking Server Health Endpoint..."

# 4. Check server health endpoint
SERVER_FILES=("server.js" "server/index.ts" "index.js" "app.js")
HEALTH_FOUND=false

for file in "${SERVER_FILES[@]}"; do
    if [ -f "$file" ]; then
        if grep -q "/health" "$file"; then
            echo -e "${GREEN}✅ Health endpoint found in ${file}${NC}"
            HEALTH_FOUND=true
            break
        fi
    fi
done

if [ "$HEALTH_FOUND" = false ]; then
    echo -e "${RED}❌ No health endpoint found in server files${NC}"
    ISSUES=$((ISSUES + 1))
fi

echo -e "\n🔧 Checking Build Dependencies..."

# 5. Check for problematic dependencies
if [ -f "package.json" ]; then
    # Check for lucide-react (known build timeout issue)
    if jq -e '.dependencies["lucide-react"]' package.json >/dev/null 2>&1; then
        VERSION=$(jq -r '.dependencies["lucide-react"]' package.json)
        echo -e "${YELLOW}⚠️ lucide-react detected: ${VERSION} (may cause build timeouts)${NC}"
    fi
    
    # Check for essential dependencies
    ESSENTIAL_DEPS=("express" "react" "react-dom")
    for dep in "${ESSENTIAL_DEPS[@]}"; do
        if jq -e ".dependencies[\"$dep\"]" package.json >/dev/null 2>&1; then
            echo -e "${GREEN}✅ ${dep} dependency found${NC}"
        else
            echo -e "${RED}❌ Missing essential dependency: ${dep}${NC}"
            ISSUES=$((ISSUES + 1))
        fi
    done
fi

echo -e "\n📁 Checking Static Assets..."

# 6. Check static assets structure
if [ -d "public" ]; then
    echo -e "${GREEN}✅ public directory exists${NC}"
    
    if [ -d "public/images" ]; then
        IMG_COUNT=$(find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" \) | wc -l)
        echo -e "${GREEN}✅ images directory with ${IMG_COUNT} files${NC}"
    else
        echo -e "${YELLOW}⚠️ No public/images directory${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ No public directory found${NC}"
fi

# Check for build output structure
if [ -d "dist/public" ]; then
    echo -e "${GREEN}✅ Build output directory exists${NC}"
    if [ -f "dist/public/index.html" ]; then
        echo -e "${GREEN}✅ Built index.html found${NC}"
    else
        echo -e "${YELLOW}⚠️ No built index.html${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ No dist/public directory (run build first)${NC}"
fi

echo -e "\n🌍 Environment Variables Check..."

# 7. Check environment variables
ENV_VARS=("NODE_ENV" "PORT" "DATABASE_URL")
for var in "${ENV_VARS[@]}"; do
    if [ ! -z "${!var}" ]; then
        echo -e "${GREEN}✅ ${var} is set${NC}"
    else
        echo -e "${YELLOW}⚠️ ${var} not set (Railway will provide)${NC}"
    fi
done

echo -e "\n📊 Verification Summary"
echo "======================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 All critical checks passed! Ready for Railway deployment.${NC}"
    echo -e "\nNext steps:"
    echo "1. Commit and push your changes to GitHub"
    echo "2. Connect your Railway project to GitHub repository"
    echo "3. Deploy with: railway deploy"
else
    echo -e "${RED}❌ Found ${ISSUES} critical issue(s) that need fixing before deployment.${NC}"
fi

echo -e "\n🔗 Railway CLI Commands:"
echo "railway login"
echo "railway link"
echo "railway deploy"
echo "railway logs --follow"

exit $ISSUES