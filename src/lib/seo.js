/**
 * SEO utility functions for generating meta tags and structured data
 * @module lib/seo
 */

/**
 * Default SEO configuration
 */
export const defaultSEO = {
  title: "LibroSync - Southville 8B E-Library | Your Gateway to Learning",
  description:
    "Southville 8B E-Library, built through the initiative of Congressman Tom Hernandez. Browse books, read announcements, and access free computer use and printing services.",
  keywords:
    "library, e-library, books, Southville 8B, Montalban, Rizal, education, reading, free books, public library",
  author: "Southville 8B E-Library",
  siteName: "LibroSync",
  url: "https://librosync.vercel.app", // Update with actual domain
  image: "/e-library.png",
  type: "website",
};

/**
 * Generate Open Graph meta tags
 * @param {Object} seo - SEO configuration object
 * @returns {Object} Open Graph meta tags
 */
export const generateOpenGraphTags = (seo = {}) => {
  const config = { ...defaultSEO, ...seo };
  return {
    "og:title": config.title,
    "og:description": config.description,
    "og:image": config.image,
    "og:url": config.url,
    "og:type": config.type,
    "og:site_name": config.siteName,
  };
};

/**
 * Generate Twitter Card meta tags
 * @param {Object} seo - SEO configuration object
 * @returns {Object} Twitter Card meta tags
 */
export const generateTwitterCardTags = (seo = {}) => {
  const config = { ...defaultSEO, ...seo };
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": config.title,
    "twitter:description": config.description,
    "twitter:image": config.image,
  };
};

/**
 * Generate JSON-LD structured data for library
 * @param {Object} options - Additional data for structured data
 * @returns {Object} JSON-LD structured data
 */
export const generateLibraryStructuredData = (options = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Library",
    name: "Southville 8B E-Library",
    alternateName: "LibroSync",
    description:
      "A public library made especially for students, offering books, announcements, and free computer and printing services.",
    url: defaultSEO.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montalban",
      addressRegion: "Rizal",
      addressCountry: "PH",
      streetAddress: "Southville 8B Phase 5, Barangay San Isidro",
    },
    openingHours: "Mo-Fr 08:00-17:00",
    ...options,
  };
};

/**
 * Generate JSON-LD structured data for a book
 * @param {Object} book - Book object
 * @returns {Object} JSON-LD structured data for book
 */
export const generateBookStructuredData = (book) => {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.author,
    },
    image: book.picture,
    description: book.description || `${book.title} by ${book.author}`,
    genre: book.genre || [],
    isbn: book.isbn || undefined,
    numberOfPages: book.pages || undefined,
    publisher: book.publisher || undefined,
    datePublished: book.publishedDate || undefined,
  };
};

/**
 * Generate canonical URL
 * @param {string} path - Path to append to base URL
 * @returns {string} Canonical URL
 */
export const generateCanonicalUrl = (path = "") => {
  const baseUrl = defaultSEO.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

