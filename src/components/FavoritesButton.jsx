import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { trackFavorite } from "@/lib/analytics";

/**
 * FavoritesButton component for toggling favorite status
 * @param {Object} props - Component props
 * @param {string} props.bookId - Book ID
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} FavoritesButton component
 */
const FavoritesButton = ({ bookId, className = "" }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(bookId);

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        const newFavoriteState = !favorited;
        toggleFavorite(bookId);
        trackFavorite(bookId, newFavoriteState);
      }}
      className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2 ${className}`}
      style={{
        backgroundColor: favorited ? "rgba(224, 165, 38, 0.2)" : "rgba(0, 0, 0, 0.1)",
        color: favorited ? "#E0A526" : "white",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
    >
      <Heart
        className={`w-5 h-5 ${favorited ? "fill-current" : ""}`}
        strokeWidth={favorited ? 0 : 2}
      />
    </motion.button>
  );
};

export default FavoritesButton;

