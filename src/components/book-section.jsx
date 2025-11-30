import BookCard from "./cards/book-card";
import { BookOpen } from "lucide-react";
import { useBooksQuery } from "@/hooks/useBooksQuery";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import { books } from "@/lib/sample";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const BookSection = () => {
  const { books, error, loading } = useBooksQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Display books for carousel - duplicate for smooth infinite loop
  const displayedBooks = books.length > 0 
    ? [...books.slice(0, 10), ...books.slice(0, 10)] // Duplicate for seamless loop
    : [];

  const handleShowMore = () => navigate("/books");

  const fadeUp = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="books">
      <div className="screen py-32">
        {/* Header */}
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-dark text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t("books.title")}
          </motion.h2>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("books.description")}
          </motion.p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 overflow-hidden rounded-2xl shadow-md bg-white animate-pulse">
                <div className="w-full aspect-[2.8/4] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Books Carousel */}
        {!loading && !error && (
          <>
            {books.length > 0 ? (
              <>
                <div className="relative overflow-hidden py-4">
                  <div className="flex gap-6 animate-scroll">
                    {/* First set of books */}
                    {displayedBooks.slice(0, 10).map((book, index) => (
                      <div
                        key={`${book._id}-${index}`}
                        className="flex-shrink-0 w-64 sm:w-72 md:w-80"
                      >
                        <BookCard book={book} onClick={(book) => navigate(`/books/${book._id}`)} />
                      </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {displayedBooks.slice(0, 10).map((book, index) => (
                      <div
                        key={`${book._id}-duplicate-${index}`}
                        className="flex-shrink-0 w-64 sm:w-72 md:w-80"
                      >
                        <BookCard book={book} onClick={(book) => navigate(`/books/${book._id}`)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Show More Button */}
                {books.length > 8 && (
                  <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleShowMore}>Show More</Button>
                    </motion.div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">
                  No Books Available
                </h3>
                <p className="text-gray-500 max-w-md mb-6">
                  We're currently updating our featured books collection. Please
                  check back soon!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BookSection;
