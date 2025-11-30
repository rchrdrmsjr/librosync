import { useState, useMemo, useEffect } from "react";
import BookCard from "@/components/cards/book-card";
import SearchBar from "@/components/searchbar";
import { BookOpen, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBooksQuery } from "@/hooks/useBooksQuery";
import { useDebounce } from "@/hooks/useDebounce";
import SEO from "@/components/SEO";
import { generateBookStructuredData } from "@/lib/seo";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { PAGINATION } from "@/lib/constants";
import { trackSearch } from "@/lib/analytics";

const BooksPage = () => {
  const { books = [], error, loading } = useBooksQuery();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);
  const [availability, setAvailability] = useState("all");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories
  const categories = [
    ...new Set(
      books
        .flatMap((b) => b.category || [])
        .filter((c) => typeof c === "string" && c.trim() !== "")
    ),
  ];

  // Extract unique genres
  const genres = [
    ...new Set(
      books
        .flatMap((b) => b.genre || [])
        .filter((g) => typeof g === "string" && g.trim() !== "")
    ),
  ];

  // Filtered and sorted books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const matchesSearch =
        debouncedSearchQuery === "" ||
        book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        (book.isbn && book.isbn.toLowerCase().includes(debouncedSearchQuery.toLowerCase()));

      const matchesAvailability =
        availability === "all"
          ? true
          : availability === "available"
          ? book.availableCount > 0
          : book.availableCount === 0;

      const matchesGenre =
        genre === "all" ? true : (book.genre || []).includes(genre);

      return matchesSearch && matchesAvailability && matchesGenre;
    });

    // Sort books
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "author-asc":
          return a.author.localeCompare(b.author);
        case "author-desc":
          return b.author.localeCompare(a.author);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [books, debouncedSearchQuery, availability, genre, sortBy]);

  // Paginated books
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE;
    const endIndex = startIndex + PAGINATION.ITEMS_PER_PAGE;
    return filteredAndSortedBooks.slice(startIndex, endIndex);
  }, [filteredAndSortedBooks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / PAGINATION.ITEMS_PER_PAGE);

  // Reset to page 1 when filters change (but not when currentPage changes)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [debouncedSearchQuery, availability, genre, sortBy, totalPages]); // Removed currentPage from deps

  const handleBookClick = (book) => {
    navigate(`/books/${book._id}`);
  };

  // Track search queries (only once per search query change)
  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 2) {
      trackSearch(debouncedSearchQuery, filteredAndSortedBooks.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]); // Only track when search query changes

  // Loading skeleton component
  const BookSkeleton = () => (
    <div className="flex-none w-64">
      <div className="overflow-hidden rounded-2xl shadow-md bg-white animate-pulse">
        <div className="w-full aspect-[2.8/4] bg-gray-200" />
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  // Loading state
  if (loading) {
    return (
      <section>
        <div className="screen py-32">
          {/* Header */}
          <motion.div
            className="text-center space-y-1 md:space-y-2 mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-dark text-2xl md:text-3xl font-bold">
              Books by Category
            </h2>
            <p className="text-gray-600">
              Browse our library by categories and discover new favorites
            </p>
          </motion.div>

          {/* Loading indicator */}
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Loader2 className="w-12 h-12 text-[#E0A526]" />
              </motion.div>
              <motion.p
                className="text-gray-600 text-lg font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Loading books...
              </motion.p>
            </motion.div>

            {/* Skeleton loaders */}
            <div className="mt-12 w-full">
              <div className="mb-8">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 p-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <BookSkeleton />
                      </motion.div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section>
        <div className="screen py-32">
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-red-100 rounded-full p-6 mb-6">
              <BookOpen className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Error Loading Books
            </h3>
            <p className="text-red-500 mb-4">{error}</p>
            <motion.button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#E0A526] text-white rounded-md hover:bg-[#C28A1A] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Generate structured data for books collection
  const booksStructuredData = books.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: books.slice(0, 10).map((book, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: generateBookStructuredData(book),
        })),
      }
    : null;

  return (
    <section>
      <SEO
        title="Books"
        description="Browse our collection of books by category. Search and filter by availability, genre, and more."
        keywords="books, library books, e-library, reading, literature"
        path="/books"
        structuredData={booksStructuredData}
      />
      <div className="screen py-32">
        {/* Header */}
        <motion.div
          className="text-center space-y-1 md:space-y-2 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-dark text-2xl md:text-3xl font-bold">
            Books by Category
          </h2>
          <p className="text-gray-600">
            Browse our library by categories and discover new favorites
          </p>

          {/* Search + Filters */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full sm:w-72"
            />

            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-full sm:w-auto min-w-[140px] bg-white rounded-full min-h-[44px]">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <SelectItem value="all">All Books</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-full sm:w-auto min-w-[140px] bg-white rounded-full min-h-[44px]">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-auto min-w-[140px] bg-white rounded-full min-h-[44px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                <SelectItem value="author-asc">Author (A-Z)</SelectItem>
                <SelectItem value="author-desc">Author (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </motion.div>

        {/* Results count and pagination info */}
        {!loading && filteredAndSortedBooks.length > 0 && (
          <div className="mb-6 text-center text-gray-600">
            Showing {paginatedBooks.length} of {filteredAndSortedBooks.length} books
          </div>
        )}

        {/* No results state */}
        {!loading && filteredAndSortedBooks.length === 0 && (
          <EmptyState
            icon={Search}
            title="No Books Found"
            description={
              searchQuery
                ? `No books match "${searchQuery}". Try adjusting your search or filters.`
                : "No books match your current filters. Try adjusting your selection."
            }
            action={
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setAvailability("all");
                  setGenre("all");
                }}
                className="px-4 py-2 bg-[#E0A526] text-white rounded-md hover:bg-[#C28A1A] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Filters
              </motion.button>
            }
          />
        )}

        {/* Category carousels */}
        {!loading && categories.length > 0 && filteredAndSortedBooks.length > 0 && (
          categories.map((cat, catIndex) => {
            const booksInCategory = filteredAndSortedBooks.filter((b) =>
              (b.category || []).includes(cat)
            );
            if (booksInCategory.length === 0) return null;

            return (
              <motion.div
                key={cat}
                className="mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 + 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </h3>
                </div>

                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 p-2">
                    {booksInCategory.map((book, bookIndex) => (
                      <motion.div
                        key={book._id}
                        className="flex-none w-64 cursor-pointer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: bookIndex * 0.05 }}
                        onClick={() => handleBookClick(book)}
                      >
                        <BookCard book={book} />
                      </motion.div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </motion.div>
            );
          })
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default BooksPage;
