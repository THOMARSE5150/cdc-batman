import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: string;
  imageUrl?: string;
}

/**
 * SEO component that manages document head metadata
 * Doesn't change any website content - only adds proper metadata for search engines
 */
export function SEO({
  title,
  description,
  canonicalPath,
  type = "website",
  imageUrl,
}: SEOProps) {
  const siteName = "Celia Dunsmore Counselling";
  const defaultDescription = "Professional counselling services by Celia Dunsmore, Accredited Mental Health Social Worker.";
  
  // Create full title with site name if not already included
  const fullTitle = title 
    ? (title.includes(siteName) ? title : `${title} | ${siteName}`)
    : siteName;
  
  // Use provided description or default if not provided
  const metaDescription = description || defaultDescription;
  
  // Determine canonical URL
  const baseUrl = typeof window !== "undefined" 
    ? `${window.location.protocol}//${window.location.host}`
    : "";
  const canonicalUrl = canonicalPath 
    ? `${baseUrl}${canonicalPath}`
    : typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute("content", metaDescription);
    } else {
      metaDescEl = document.createElement("meta");
      metaDescEl.setAttribute("name", "description");
      metaDescEl.setAttribute("content", metaDescription);
      document.head.appendChild(metaDescEl);
    }
    
    // Set canonical link
    if (canonicalUrl) {
      let linkEl = document.querySelector('link[rel="canonical"]');
      if (linkEl) {
        linkEl.setAttribute("href", canonicalUrl);
      } else {
        linkEl = document.createElement("link");
        linkEl.setAttribute("rel", "canonical");
        linkEl.setAttribute("href", canonicalUrl);
        document.head.appendChild(linkEl);
      }
    }
    
    // Add OpenGraph meta tags
    updateOrCreateMetaTag("property", "og:title", fullTitle);
    updateOrCreateMetaTag("property", "og:description", metaDescription);
    updateOrCreateMetaTag("property", "og:type", type);
    updateOrCreateMetaTag("property", "og:url", canonicalUrl);
    updateOrCreateMetaTag("property", "og:site_name", siteName);
    
    if (imageUrl) {
      updateOrCreateMetaTag("property", "og:image", imageUrl);
    }
    
    // Add Twitter Card meta tags
    updateOrCreateMetaTag("name", "twitter:card", "summary_large_image");
    updateOrCreateMetaTag("name", "twitter:title", fullTitle);
    updateOrCreateMetaTag("name", "twitter:description", metaDescription);
    
    if (imageUrl) {
      updateOrCreateMetaTag("name", "twitter:image", imageUrl);
    }

    // Clean up function
    return () => {
      // No cleanup needed as we don't want to remove the tags
      // when component unmounts - they should persist for the next page
    };
  }, [fullTitle, metaDescription, canonicalUrl, type, imageUrl]);

  // Helper function to update or create meta tags
  function updateOrCreateMetaTag(
    attributeName: string,
    attributeValue: string,
    content: string
  ) {
    let metaTag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (metaTag) {
      metaTag.setAttribute("content", content);
    } else {
      metaTag = document.createElement("meta");
      metaTag.setAttribute(attributeName, attributeValue);
      metaTag.setAttribute("content", content);
      document.head.appendChild(metaTag);
    }
  }

  // This component doesn't render anything visible
  return null;
}