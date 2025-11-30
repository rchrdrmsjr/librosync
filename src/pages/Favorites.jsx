import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/useFavorites";
import { useBooksQuery } from "@/hooks/useBooksQuery";
import BookCard from "@/components/cards/book-card";
import EmptyState from "@/components/EmptyState";
import { Heart, BookOpen } from "lucide-react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * Favorites page displaying user's favorite books
 * @returns {JSX.Element} Favorites page component
 */
const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { books } = useBooksQuery();
  const navigate = useNavigate();

  const favoriteBooks = books.filter((book) => favorites.includes(book._id));

  return (
    <section>
      <SEO
        title="Favorites"
        description="View your favorite books from the library collection"
        path="/favorites"
      />
      <div className="screen py-32">
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-dark text-2xl md:text-3xl font-bold">
            My Favorites
          </h2>
          <p className="text-gray-600">
            Books you've marked as favorites
          </p>
        </motion.div>

        {favoriteBooks.length > 0 && (
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              {favoriteBooks.length} {favoriteBooks.length === 1 ? "book" : "books"} in favorites
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={clearFavorites}
                className="text-red-600 hover:text-red-700 hover:border-red-700"
              >
                Clear All
              </Button>
            </motion.div>
          </div>
        )}

        {favoriteBooks.length > 0 ? (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {favoriteBooks.map((book, index) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/books?book=${book._id}`)}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <EmptyState
            icon={Heart}
            title="No Favorites Yet"
            description="Start adding books to your favorites by clicking the heart icon on any book card."
            action={
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate("/books")} style={{ backgroundColor: "#E0A526" }}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Books
                </Button>
              </motion.div>
            }
          />
        )}
      </div>
    </section>
  );
};

export default Favorites;

