/**
 * Image utility functions for optimization and lazy loading
 * @module lib/imageUtils
 */

/**
 * Generate responsive image srcset
 * @param {string} baseUrl - Base image URL
 * @param {number[]} widths - Array of widths for srcset
 * @returns {string} srcset string
 */
export const generateSrcSet = (baseUrl, widths = [400, 800, 1200]) => {
  if (!baseUrl) return "";
  
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(", ");
};

/**
 * Generate sizes attribute for responsive images
 * @param {Object} breakpoints - Breakpoint configuration
 * @returns {string} sizes string
 */
export const generateSizes = (breakpoints = {
  mobile: "100vw",
  tablet: "50vw",
  desktop: "33vw",
}) => {
  return `(max-width: 640px) ${breakpoints.mobile}, (max-width: 1024px) ${breakpoints.tablet}, ${breakpoints.desktop}`;
};

/**
 * Create a blur placeholder data URL
 * @param {number} width - Placeholder width
 * @param {number} height - Placeholder height
 * @returns {string} Data URL for placeholder
 */
export const createBlurPlaceholder = (width = 10, height = 15) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#e0e0e0");
  gradient.addColorStop(1, "#f5f5f5");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
};

/**
 * Check if image should be lazy loaded
 * @param {HTMLElement} element - Image element
 * @returns {boolean} Whether to lazy load
 */
export const shouldLazyLoad = (element) => {
  if (!element) return false;
  
  // Check if browser supports native lazy loading
  if ("loading" in HTMLImageElement.prototype) {
    return true;
  }
  
  // Fallback: check if element is in viewport
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight + 100;
};

