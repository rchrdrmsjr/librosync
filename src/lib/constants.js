/**
 * Application constants and configuration
 * @module lib/constants
 */

/**
 * API Configuration
 * Uses environment variables with fallback to default values
 */
export const API_CONFIG = {
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://api-backend-urlr.onrender.com",
  ENDPOINTS: {
    BOOKS: "/api/books",
    ANNOUNCEMENTS: "/api/announcements",
  },
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

/**
 * Color constants matching the design system
 */
export const COLORS = {
  PRIMARY_DARK: "#2C2C3E",
  PRIMARY: "#43435E",
  SECONDARY: "#E0A526",
  SECONDARY_DARK: "#C28A1A",
  LIGHT: "#F3F3F7",
  DARK: "#16324F",
  TEXT: "#33394A",
};

/**
 * Animation constants
 */
export const ANIMATION = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_OUT: "easeOut",
    EASE_IN: "easeIn",
    EASE_IN_OUT: "easeInOut",
  },
};

/**
 * Pagination constants
 */
export const PAGINATION = {
  ITEMS_PER_PAGE: 20,
  DEFAULT_PAGE: 1,
};

/**
 * Search constants
 */
export const SEARCH = {
  DEBOUNCE_DELAY: 300, // milliseconds
  MIN_QUERY_LENGTH: 1,
};

/**
 * Cache time constants (in milliseconds)
 */
export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
};

