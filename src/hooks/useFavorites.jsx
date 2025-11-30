import { useLocalStorage } from "./useLocalStorage";

const FAVORITES_KEY = "librosync_favorites";

/**
 * Custom hook for managing favorite books
 * @returns {Object} Favorites management functions and state
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, []);

  /**
   * Add a book to favorites
   * @param {string} bookId - Book ID to add
   */
  const addFavorite = (bookId) => {
    if (!favorites.includes(bookId)) {
      setFavorites([...favorites, bookId]);
    }
  };

  /**
   * Remove a book from favorites
   * @param {string} bookId - Book ID to remove
   */
  const removeFavorite = (bookId) => {
    setFavorites(favorites.filter((id) => id !== bookId));
  };

  /**
   * Toggle favorite status
   * @param {string} bookId - Book ID to toggle
   */
  const toggleFavorite = (bookId) => {
    if (isFavorite(bookId)) {
      removeFavorite(bookId);
    } else {
      addFavorite(bookId);
    }
  };

  /**
   * Check if a book is favorited
   * @param {string} bookId - Book ID to check
   * @returns {boolean} Whether book is favorited
   */
  const isFavorite = (bookId) => {
    return favorites.includes(bookId);
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};

