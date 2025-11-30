/**
 * API client configuration and utilities
 * @module lib/api
 */

import { API_CONFIG } from "./constants";

/**
 * Create a timeout promise
 * @param {number} ms - Timeout in milliseconds
 * @returns {Promise} Timeout promise
 */
const createTimeout = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), ms);
  });
};

/**
 * Fetch with timeout
 * @param {string} url - Request URL
 * @param {RequestInit} options - Fetch options
 * @returns {Promise<Response>} Fetch response
 */
const fetchWithTimeout = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await Promise.race([
      fetch(url, { ...options, signal: controller.signal }),
      createTimeout(API_CONFIG.TIMEOUT),
    ]);
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
};

/**
 * Check if error is a network error
 * @param {Error} error - Error object
 * @returns {boolean} Whether it's a network error
 */
export const isNetworkError = (error) => {
  return (
    error.message === "Failed to fetch" ||
    error.message === "NetworkError" ||
    error.message === "Request timeout" ||
    !navigator.onLine
  );
};

/**
 * Get user-friendly error message
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (isNetworkError(error)) {
    return "Network error. Please check your connection and try again.";
  }
  if (error.message === "Request timeout") {
    return "Request took too long. Please try again.";
  }
  return error.message || "An unexpected error occurred.";
};

/**
 * Fetch books from API
 * @returns {Promise<Array>} Array of books
 */
export const fetchBooks = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.BOOKS}`;
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch announcements from API
 * @returns {Promise<Array>} Array of announcements
 */
export const fetchAnnouncements = async () => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANNOUNCEMENTS}`;
  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch announcements: ${response.statusText}`);
  }

  return response.json();
};

