import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { seoConfig, generatePageMeta } from '@/lib/seoConfig';

// Dynamically update meta tags based on current route
export default function MetaManager() {
  const [location] = useLocation();

  useEffect(() => {
    // Map routes to page keys
    const getPageKey = (path: string): keyof typeof seoConfig.pages => {
      switch (path) {
        case '/':
          return 'home';
        case '/meet-celia':
          return 'about';
        case '/services':
          return 'services';
        case '/contact':
          return 'contact';
        case '/fees':
          return 'fees';
        case '/faq':
          return 'faq';
        default:
          return 'home';
      }
    };

    const pageKey = getPageKey(location);
    const meta = generatePageMeta(pageKey);

    // Update document title
    document.title = meta.title;

    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', meta.canonical);
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.openGraph.title);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.openGraph.description);
    }

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', meta.openGraph.url);
    }

    // Update Twitter Card tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', meta.openGraph.title);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', meta.openGraph.description);
    }

    // Announce page change for screen readers
    const announcePageChange = () => {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        setTimeout(() => {
          liveRegion.textContent = `Navigated to ${meta.title}`;
          setTimeout(() => {
            liveRegion.textContent = '';
          }, 1000);
        }, 100);
      }
    };

    announcePageChange();
  }, [location]);

  return null;
}