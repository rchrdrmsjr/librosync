import { useLocalStorage } from "./useLocalStorage";

const HISTORY_KEY = "librosync_reading_history";
const MAX_HISTORY_ITEMS = 50;

/**
 * Custom hook for managing reading history
 * @returns {Object} Reading history management functions and state
 */
export const useReadingHistory = () => {
  const [history, setHistory] = useLocalStorage(HISTORY_KEY, []);

  /**
   * Add a book to reading history
   * @param {Object} book - Book object to add
   */
  const addToHistory = (book) => {
    if (!book || !book._id) return;

    const historyItem = {
      bookId: book._id,
      title: book.title,
      author: book.author,
      picture: book.picture,
      viewedAt: new Date().toISOString(),
    };

    // Remove if already exists
    const filteredHistory = history.filter(
      (item) => item.bookId !== book._id
    );

    // Add to beginning and limit size
    const newHistory = [historyItem, ...filteredHistory].slice(
      0,
      MAX_HISTORY_ITEMS
    );

    setHistory(newHistory);
  };

  /**
   * Clear reading history
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * Remove a specific item from history
   * @param {string} bookId - Book ID to remove
   */
  const removeFromHistory = (bookId) => {
    setHistory(history.filter((item) => item.bookId !== bookId));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};

