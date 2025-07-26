/**
 * Image optimization utilities for better performance
 */

export function generateSrcSet(src: string): string {
  // For external URLs or SVGs, return the original source
  if (src.startsWith('http') || src.endsWith('.svg')) {
    return src;
  }

  // Generate multiple sizes for responsive images
  const sizes = [480, 768, 1024, 1200, 1920];
  const srcSetEntries = sizes.map(size => {
    return `${src}?w=${size}&q=75 ${size}w`;
  });

  return srcSetEntries.join(', ');
}

export function getOptimizedImageUrl(src: string, width?: number, quality = 80): string {
  // For external URLs or SVGs, return as-is
  if (src.startsWith('http') || src.endsWith('.svg')) {
    return src;
  }

  const params = new URLSearchParams();
  
  if (width) {
    params.append('w', width.toString());
  }
  
  params.append('q', quality.toString());
  
  return `${src}?${params.toString()}`;
}