import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  User,
  Tag,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooksQuery } from "@/hooks/useBooksQuery";
import { trackBookView } from "@/lib/analytics";
import SEO from "@/components/SEO";
import { generateBookStructuredData } from "@/lib/seo";
import { Loader2 } from "lucide-react";

/**
 * BookDetail page for displaying book details
 * @returns {JSX.Element} BookDetail page component
 */
const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books = [], loading } = useBooksQuery();
  const { addToHistory } = useReadingHistory();
  const trackedRef = useRef(false);

  const book = books.find((b) => b._id === id);

  useEffect(() => {
    if (book && !trackedRef.current) {
      addToHistory(book);
      trackBookView(book._id, book.title);
      trackedRef.current = true;
    }
  }, [book]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#E0A526] animate-spin" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Book Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The book you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate("/books")}>Back to Books</Button>
        </div>
      </div>
    );
  }

  const isAvailable = book.availableCount > 0;

  return (
    <>
      <SEO
        title={`${book.title} by ${book.author} | LibroSync`}
        description={
          book.description || `View details for ${book.title} by ${book.author}`
        }
        keywords={book.genre?.join(", ") || ""}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBookStructuredData(book)),
        }}
      />

      <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 pt-24 pb-16">
        <div className="screen">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate("/books")}
              className="group flex items-center gap-2 text-gray-700 hover:text-[#E0A526] transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Books</span>
            </button>
          </motion.div>

          {/* Main Content - Editorial Style Layout */}
          <div className="relative">
            {/* Decorative accent line */}
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#E0A526] via-blue-500 to-purple-500 rounded-full hidden lg:block"></div>

            <div className="lg:pl-12">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column - Book Cover (40% width on large screens) */}
                <motion.div
                  className="lg:col-span-5 relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Book Cover Container with Border */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#E0A526] via-blue-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
                    <div className="relative bg-white rounded-2xl p-4 border-2 border-gray-200">
                      <motion.img
                        src={book.picture}
                        alt={`${book.title} cover`}
                        className="w-full rounded-xl object-cover"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Availability Badge - Positioned outside */}
                  <motion.div
                    className="mt-4 flex justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        isAvailable
                          ? "bg-green-100 text-green-700 border-2 border-green-300"
                          : "bg-red-100 text-red-700 border-2 border-red-300"
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          {book.availableCount} available
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          Unavailable
                        </>
                      )}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Book Details (60% width on large screens) */}
                <motion.div
                  className="lg:col-span-7 space-y-8"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Title Section */}
                  <div className="space-y-4">
                    <div className="inline-block">
                      <span className="text-xs font-bold tracking-wider text-[#E0A526] uppercase">
                        Book Details
                      </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                      {book.title}
                    </h1>
                    <div className="flex items-center gap-3 text-lg text-gray-600">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#E0A526] to-transparent"></div>
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{book.author}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {book.description && (
                    <div className="pt-6 border-t-2 border-gray-200">
                      <h2 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-3">
                        About
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {book.description}
                      </p>
                    </div>
                  )}

                  {/* Categories & Genres - Side by Side */}
                  {(book.genre?.length > 0 || book.category?.length > 0) && (
                    <div className="grid md:grid-cols-2 gap-6 pt-6 border-t-2 border-gray-200">
                      {book.genre && book.genre.length > 0 && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-4 h-4 text-[#E0A526]" />
                            <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase">
                              Genres
                            </h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {book.genre.map((genre, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 rounded-full text-sm font-medium border border-blue-200"
                              >
                                {genre}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {book.category && book.category.length > 0 && (
                        <div>
                          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-3">
                            Category
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {book.category.map((cat, index) => (
                              <span
                                key={index}
                                className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-300"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Metadata Grid */}
                  {(book.isbn || book.publisher || book.publishedDate) && (
                    <div className="pt-6 border-t-2 border-gray-200">
                      <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase mb-4">
                        Publication Details
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {book.isbn && (
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              ISBN
                            </span>
                            <p className="text-gray-800 font-medium">
                              {book.isbn}
                            </p>
                          </div>
                        )}

                        {book.publisher && (
                          <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              Publisher
                            </span>
                            <p className="text-gray-800 font-medium">
                              {book.publisher}
                            </p>
                          </div>
                        )}

                        {book.publishedDate && (
                          <div className="sm:col-span-2 flex items-center gap-2 pt-2 border-t border-gray-200">
                            <Calendar className="w-4 h-4 text-[#E0A526]" />
                            <div className="space-y-1">
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block">
                                Published
                              </span>
                              <p className="text-gray-800 font-medium">
                                {book.publishedDate}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookDetail;
