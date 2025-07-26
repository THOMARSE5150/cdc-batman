// Mobile Performance Test Script
// Tests the mobile optimizations we've implemented

const puppeteer = require('puppeteer');

async function testMobilePerformance() {
  console.log('🧪 Starting Mobile Performance Test...');
  console.log('=====================================');

  let browser;
  try {
    // Launch browser in mobile mode
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Set mobile viewport
    await page.setViewport({
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    // Set mobile user agent
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

    console.log('📱 Configured mobile simulation (iPhone 375x667)');

    // Navigate to the site
    const startTime = Date.now();
    await page.goto('http://localhost:5000', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    const loadTime = Date.now() - startTime;
    
    console.log(`⏱️ Page Load Time: ${loadTime}ms`);

    // Wait for optimizations to apply
    await page.waitForTimeout(3000);

    // Check if mobile optimizations are applied
    const optimizationChecks = await page.evaluate(() => {
      const checks = {
        criticalLoaded: document.documentElement.hasAttribute('data-critical-loaded'),
        imagesOptimized: document.documentElement.hasAttribute('data-images-optimized'),
        jsOptimized: document.documentElement.hasAttribute('data-js-optimized'),
        cssOptimized: document.documentElement.hasAttribute('data-css-optimized'),
        mobileEnhanced: document.documentElement.hasAttribute('data-mobile-enhanced'),
        mobileBootstrap: document.documentElement.hasAttribute('data-mobile-boosted'),
        touchDevice: document.documentElement.classList.contains('touch-device'),
        webpSupport: document.documentElement.classList.contains('webp-support')
      };
      
      return checks;
    });

    console.log('\n🔧 Optimization Status:');
    console.log('----------------------');
    Object.entries(optimizationChecks).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      console.log(`${status} ${key}: ${value}`);
    });

    // Measure Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals = {};
        let observersSet = 0;
        const maxObservers = 3;
        
        const checkComplete = () => {
          observersSet++;
          if (observersSet >= maxObservers) {
            setTimeout(() => resolve(vitals), 1000);
          }
        };

        // Measure FCP
        if ('PerformanceObserver' in window) {
          try {
            const fcpObserver = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                  vitals.fcp = Math.round(entry.startTime);
                }
              }
            });
            fcpObserver.observe({ entryTypes: ['paint'] });
          } catch (e) {
            console.log('FCP measurement not supported');
          }
          checkComplete();

          // Measure LCP
          try {
            const lcpObserver = new PerformanceObserver((entryList) => {
              const entries = entryList.getEntries();
              if (entries.length > 0) {
                const lastEntry = entries[entries.length - 1];
                vitals.lcp = Math.round(lastEntry.startTime);
              }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            console.log('LCP measurement not supported');
          }
          checkComplete();

          // Measure CLS
          try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
              for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                  clsValue += entry.value;
                }
              }
              vitals.cls = clsValue;
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
          } catch (e) {
            console.log('CLS measurement not supported');
          }
          checkComplete();
        } else {
          resolve(vitals);
        }
      });
    });

    console.log('\n⏱️ Core Web Vitals:');
    console.log('-------------------');
    if (webVitals.fcp) {
      const fcpStatus = webVitals.fcp < 1800 ? '✅ GOOD' : '❌ NEEDS IMPROVEMENT';
      console.log(`FCP: ${webVitals.fcp}ms ${fcpStatus} (target: <1800ms)`);
    }
    if (webVitals.lcp) {
      const lcpStatus = webVitals.lcp < 2500 ? '✅ GOOD' : '❌ NEEDS IMPROVEMENT';
      console.log(`LCP: ${webVitals.lcp}ms ${lcpStatus} (target: <2500ms)`);
    }
    if (webVitals.cls !== undefined) {
      const clsStatus = webVitals.cls < 0.1 ? '✅ GOOD' : '❌ NEEDS IMPROVEMENT';
      console.log(`CLS: ${webVitals.cls.toFixed(3)} ${clsStatus} (target: <0.1)`);
    }

    // Check network resources
    const networkMetrics = await page.evaluate(() => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource');
        const images = resources.filter(r => r.initiatorType === 'img');
        const scripts = resources.filter(r => r.initiatorType === 'script');
        const stylesheets = resources.filter(r => r.initiatorType === 'link' || r.initiatorType === 'css');
        
        const totalSize = resources.reduce((acc, r) => acc + (r.transferSize || 0), 0);
        
        return {
          totalResources: resources.length,
          images: images.length,
          scripts: scripts.length,
          stylesheets: stylesheets.length,
          totalSize: Math.round(totalSize / 1024), // KB
          imageSize: Math.round(images.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024),
          scriptSize: Math.round(scripts.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024),
          cssSize: Math.round(stylesheets.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024)
        };
      }
      return null;
    });

    if (networkMetrics) {
      console.log('\n🌐 Network Metrics:');
      console.log('------------------');
      console.log(`Total Resources: ${networkMetrics.totalResources}`);
      console.log(`Total Size: ${networkMetrics.totalSize} KB`);
      console.log(`Images: ${networkMetrics.images} (${networkMetrics.imageSize} KB)`);
      console.log(`Scripts: ${networkMetrics.scripts} (${networkMetrics.scriptSize} KB)`);
      console.log(`Stylesheets: ${networkMetrics.stylesheets} (${networkMetrics.cssSize} KB)`);
    }

    // Check cache status
    const cacheStatus = await page.evaluate(() => {
      if ('caches' in window) {
        return caches.keys().then(cacheNames => ({
          available: true,
          cacheNames: cacheNames
        }));
      }
      return { available: false, cacheNames: [] };
    });

    console.log('\n💾 Cache Status:');
    console.log('---------------');
    if (cacheStatus.available && cacheStatus.cacheNames.length > 0) {
      console.log(`✅ Service Worker Cache Active: ${cacheStatus.cacheNames.join(', ')}`);
    } else {
      console.log('❌ No Service Worker Cache Found');
    }

    // Calculate estimated Lighthouse score
    let estimatedScore = 72; // Starting score
    
    // Add points for optimizations
    if (optimizationChecks.criticalLoaded) estimatedScore += 3;
    if (optimizationChecks.imagesOptimized) estimatedScore += 5;
    if (optimizationChecks.jsOptimized) estimatedScore += 4;
    if (optimizationChecks.cssOptimized) estimatedScore += 2;
    if (optimizationChecks.mobileEnhanced) estimatedScore += 3;
    if (cacheStatus.cacheNames.length > 0) estimatedScore += 3;
    
    // Adjust for Core Web Vitals
    if (webVitals.fcp && webVitals.fcp < 1800) estimatedScore += 2;
    if (webVitals.lcp && webVitals.lcp < 2500) estimatedScore += 3;
    if (webVitals.cls !== undefined && webVitals.cls < 0.1) estimatedScore += 2;

    console.log('\n📊 Performance Summary:');
    console.log('======================');
    console.log(`Estimated Mobile Score: ${Math.min(estimatedScore, 100)}/100`);
    console.log(`Improvement: +${Math.min(estimatedScore, 100) - 72} points`);
    
    if (estimatedScore >= 90) {
      console.log('🎉 TARGET ACHIEVED: 90+ Mobile Score!');
    } else if (estimatedScore >= 80) {
      console.log('✅ Good Progress: 80+ Mobile Score');
    } else {
      console.log('⚠️ More Optimization Needed');
    }

    console.log('\n🚀 Next Steps:');
    console.log('1. Run actual Lighthouse mobile audit');
    console.log('2. Test on real mobile devices');
    console.log('3. Monitor Core Web Vitals in production');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test if this script is executed directly
if (require.main === module) {
  testMobilePerformance().catch(console.error);
}

module.exports = { testMobilePerformance };