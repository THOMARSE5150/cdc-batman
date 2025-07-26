# Railway Production Dockerfile - Optimized for Railway Best Practices
FROM node:20-alpine AS base

# Install system dependencies for Railway
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    dumb-init \
    wget \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S server -u 1001 -G nodejs

# Copy package files for dependency caching
COPY --chown=server:nodejs package*.json ./

# Install dependencies (including dev for build)
RUN npm ci --include=dev --no-audit --no-fund

# Copy source code with proper ownership
COPY --chown=server:nodejs . .

# Build the React application for Railway
RUN echo "🚀 Building React application for Railway..." && \
    NODE_ENV=production npm run build && \
    echo "🔍 Verifying build..." && \
    test -f "dist/public/index.html" && echo "✅ index.html found" && \
    test -d "dist/public/assets" && echo "✅ assets directory found" && \
    ls -la dist/public/ && \
    echo "✅ Railway production build ready!"

# Clean up dev dependencies for smaller image
RUN npm ci --omit=dev --no-audit --no-fund && \
    npm cache clean --force

# Remove unnecessary files to reduce image size
RUN rm -rf \
    client/src \
    server/*.ts \
    *.md \
    archived_docs \
    attached_assets \
    .git \
    node_modules/.cache

# Switch to non-root user
USER server

# Railway-optimized health check
HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-5000}/health || exit 1

# Railway will set the PORT environment variable
EXPOSE $PORT

# Use dumb-init for proper signal handling in Railway containers
ENTRYPOINT ["dumb-init", "--"]

# Start the server (Railway expects this command)
CMD ["npm", "start"]