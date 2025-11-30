/**
 * Centralized error handling utilities
 * @module lib/errorHandler
 */

/**
 * Error types
 */
export const ERROR_TYPES = {
  NETWORK: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT_ERROR",
  API: "API_ERROR",
  VALIDATION: "VALIDATION_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
};

/**
 * Log error to console (prepare for Sentry integration)
 * @param {Error} error - Error object
 * @param {Object} context - Additional context
 */
export const logError = (error, context = {}) => {
  console.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    type: error.type || ERROR_TYPES.UNKNOWN,
    context,
    timestamp: new Date().toISOString(),
  });

  // TODO: Integrate with Sentry when available
  // if (window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context });
  // }
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @returns {string} User-friendly message
 */
export const getUserFriendlyMessage = (error) => {
  if (!error) return "An unexpected error occurred.";

  switch (error.type) {
    case ERROR_TYPES.NETWORK:
      return "Network error. Please check your internet connection and try again.";
    case ERROR_TYPES.TIMEOUT:
      return "Request took too long. Please try again.";
    case ERROR_TYPES.API:
      return "Server error. Please try again later.";
    case ERROR_TYPES.VALIDATION:
      return "Invalid input. Please check your data and try again.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
};

/**
 * Create a custom error with type
 * @param {string} message - Error message
 * @param {string} type - Error type
 * @returns {Error} Custom error object
 */
export const createError = (message, type = ERROR_TYPES.UNKNOWN) => {
  const error = new Error(message);
  error.type = type;
  return error;
};

