/**
 * Image Asset Utility
 * Ensures reliable image paths and automatic fallbacks across all Vite environments.
 */

export function getImageUrl(path, fallback = "/images/products/pp_woven_bag.svg") {
  if (!path) return fallback;
  // If path is absolute URL
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Standard public folder path
  if (path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
}

/**
 * Image error handler fallback for <img> tags
 */
export function handleImageError(e, fallbackPath = "/images/products/pp_woven_bag.svg") {
  if (e.target && e.target.src !== fallbackPath) {
    e.target.src = fallbackPath;
  }
}
