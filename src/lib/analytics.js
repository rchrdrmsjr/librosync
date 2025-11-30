/**
 * Analytics utility functions
 * @module lib/analytics
 */

/**
 * Track page view
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("config", import.meta.env.VITE_GA_ID || "", {
      page_path: path,
      page_title: title,
    });
  }

  // Analytics tracking (no console logs)
};

/**
 * Track custom event
 * @param {string} eventName - Event name
 * @param {Object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  }

  // Analytics tracking (no console logs)
};

/**
 * Track search query
 * @param {string} query - Search query
 * @param {number} resultsCount - Number of results
 */
export const trackSearch = (query, resultsCount) => {
  trackEvent("search", {
    search_term: query,
    results_count: resultsCount,
  });
};

/**
 * Track book view
 * @param {string} bookId - Book ID
 * @param {string} bookTitle - Book title
 */
export const trackBookView = (bookId, bookTitle) => {
  trackEvent("view_book", {
    book_id: bookId,
    book_title: bookTitle,
  });
};

/**
 * Track favorite action
 * @param {string} bookId - Book ID
 * @param {boolean} isFavorite - Whether book is favorited
 */
export const trackFavorite = (bookId, isFavorite) => {
  trackEvent(isFavorite ? "add_favorite" : "remove_favorite", {
    book_id: bookId,
  });
};

