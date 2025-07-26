/**
 * Utility functions for optimizing images
 */

/**
 * Generates a srcset attribute value for responsive images
 * @param {string} baseUrl - The base URL of the image
 * @param {number[]} widths - Array of widths to generate
 * @returns {string} - The formatted srcset string
 */
export function generateSrcSet(baseUrl: string, widths: number[] = [320, 640, 768, 1024, 1280]): string {
  // For external URLs, we can't modify the URL
  if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
    return baseUrl;
  }
  
  // For data URLs or SVGs, just return the original
  if (baseUrl.startsWith('data:') || baseUrl.endsWith('.svg')) {
    return baseUrl;
  }
  
  // Extract the path parts
  const [path, queryString] = baseUrl.split('?');
  const query = queryString ? `?${queryString}` : '';
  
  try {
    // Generate the srcset string
    const srcSetParts = widths.map(width => {
      // For local images in the public folder
      return `${path}?width=${width}${query} ${width}w`;
    });
    
    return srcSetParts.join(', ');
  } catch (error) {
    console.error('Error generating srcset:', error);
    return baseUrl;
  }
}

/**
 * Returns optimized image size based on viewport and container width
 * @param {number} containerWidth - The width of the container in pixels
 * @param {number} [devicePixelRatio=1] - The device pixel ratio for high DPI screens
 * @returns {number} - The optimal image width to load
 */
export function getOptimalImageWidth(containerWidth: number, devicePixelRatio: number = window.devicePixelRatio || 1): number {
  // Calculate the optimal size accounting for device pixel ratio
  const optimalWidth = containerWidth * devicePixelRatio;
  
  // Get the next standard size up from the calculated optimal width
  const standardSizes = [320, 640, 768, 1024, 1280, 1536, 1920, 2560];
  
  for (const size of standardSizes) {
    if (size >= optimalWidth) {
      return size;
    }
  }
  
  // If larger than our largest standard size, return the largest
  return standardSizes[standardSizes.length - 1];
}

/**
 * Creates a optimized background image style with proper sizing
 * @param {string} url - The image URL
 * @param {string} [position='center'] - The background position
 * @param {string} [size='cover'] - The background size
 * @returns {React.CSSProperties} - The style object for the background
 */
export function optimizedBackgroundImage(
  url: string, 
  position: string = 'center',
  size: string = 'cover'
): React.CSSProperties {
  return {
    backgroundImage: `url(${url})`,
    backgroundPosition: position,
    backgroundSize: size,
    backgroundRepeat: 'no-repeat',
  };
}