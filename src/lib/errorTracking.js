/**
 * Error tracking utilities (prepared for Sentry integration)
 * @module lib/errorTracking
 */

/**
 * Initialize error tracking
 */
export const initErrorTracking = () => {
  // TODO: Initialize Sentry when available
  // if (import.meta.env.VITE_SENTRY_DSN) {
  //   Sentry.init({
  //     dsn: import.meta.env.VITE_SENTRY_DSN,
  //     environment: import.meta.env.MODE,
  //     tracesSampleRate: 1.0,
  //   });
  // }
};

/**
 * Capture exception
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const captureException = (error, context = {}) => {
  // TODO: Send to Sentry when available
  // if (window.Sentry) {
  //   Sentry.captureException(error, { extra: context });
  // }

  // Log to console for now
  console.error("Error captured:", error, context);
};

/**
 * Capture message
 * @param {string} message - Message to capture
 * @param {string} level - Severity level
 */
export const captureMessage = (message, level = "info") => {
  // TODO: Send to Sentry when available
  // if (window.Sentry) {
  //   Sentry.captureMessage(message, level);
  // }

  // Log to console for now
  console.log(`[${level.toUpperCase()}]`, message);
};

