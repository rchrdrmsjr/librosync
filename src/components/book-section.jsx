import BookCard from "./cards/book-card";
import { BookOpen } from "lucide-react";
import { useBook } from "@/hooks/useBook";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { books } from "@/lib/sample";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const BookSection = () => {
  const { books, error, loading } = useBook();
  const navigate = useNavigate();

  const displayedBooks = books.slice(0, 6);

  const handleShowMore = () => navigate("/books");

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="books">
      <div className="screen py-32">
        {/* Header */}
        <div className="text-center space-y-1 md:space-y-2 mb-10">
          <h2 className="text-dark text-2xl md:text-3xl font-bold">
            Featured Books
          </h2>
          <p className="text-gray-600">
            Discover our carefully curated collection of popular and recommended
            titles
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-500">Loading books...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {/* Books */}
        {!loading && !error && (
          <>
            {books.length > 0 ? (
              <>
                {/* GRID for larger screens */}
                <div className="hidden sm:grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
                  {displayedBooks.map((book, index) => (
                    <motion.div
                      key={book._id}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <BookCard book={book} />
                    </motion.div>
                  ))}
                </div>

                {/* CAROUSEL for mobile */}
                <div className="block sm:hidden">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1.1}
                    centeredSlides={true}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    loop={true}
                  >
                    {displayedBooks.map((book, index) => (
                      <SwiperSlide key={book._id}>
                        <motion.div
                          variants={fadeUp}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="px-4 p-1"
                        >
                          <BookCard book={book} />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Show More Button */}
                {books.length > 8 && (
                  <div className="flex justify-center mt-8">
                    <Button onClick={handleShowMore}>Show More</Button>
                  </div>
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
