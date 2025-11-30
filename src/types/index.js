/**
 * Type definitions using JSDoc
 * @module types
 */

/**
 * @typedef {Object} Book
 * @property {string} _id - Unique book identifier
 * @property {string} title - Book title
 * @property {string} author - Book author
 * @property {string} picture - Book cover image URL
 * @property {number} availableCount - Number of available copies
 * @property {string[]} [genre] - Array of genres
 * @property {string[]} [category] - Array of categories
 * @property {string} [description] - Book description
 * @property {string} [isbn] - ISBN number
 * @property {string} [publisher] - Publisher name
 * @property {string} [publishedDate] - Publication date
 * @property {number} [pages] - Number of pages
 */

/**
 * @typedef {Object} Announcement
 * @property {string} id - Unique announcement identifier
 * @property {string} title - Announcement title
 * @property {string} content - Announcement content
 * @property {string} createdAt - Creation date (ISO string)
 */

/**
 * @typedef {Object} Service
 * @property {number} id - Service identifier
 * @property {string} title - Service title
 * @property {string} description - Service description
 * @property {Function} icon - Icon component
 */

/**
 * @typedef {'all' | 'available' | 'unavailable'} AvailabilityFilter
 */

/**
 * @typedef {'title-asc' | 'title-desc' | 'author-asc' | 'author-desc'} SortOption
 */

