import { useState } from "react";
import BookCard from "@/components/cards/book-card";
import SearchBar from "@/components/searchbar";
import { BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useBook } from "@/hooks/useBook";

const BooksPage = () => {
  const { books = [], error, loading } = useBook();

  const [searchQuery, setSearchQuery] = useState("");
  const [availability, setAvailability] = useState("all");
  const [genre, setGenre] = useState("all");

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

  // Filtered books
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

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

  return (
    <section>
      <div className="screen py-32">
        {/* Header */}
        <div className="text-center space-y-1 md:space-y-2 mb-10">
          <h2 className="text-dark text-2xl md:text-3xl font-bold">
            Books by Category
          </h2>
          <p className="text-gray-600">
            Browse our library by categories and discover new favorites
          </p>

          {/* Search + Filters */}
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full sm:w-72"
            />

            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="md:w-46 w-full bg-white rounded-full">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Books</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="md:w-46 w-full bg-white rounded-full">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category carousels */}
        {categories.length > 0 ? (
          categories.map((cat) => {
            const booksInCategory = filteredBooks.filter((b) =>
              (b.category || []).includes(cat)
            );
            if (booksInCategory.length === 0) return null;

            return (
              <div key={cat} className="mb-16">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-primary">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </h3>
                </div>

                <ScrollArea className="w-full whitespace-nowrap">
                  <div className="flex gap-4 p-2">
                    {booksInCategory.map((book) => (
                      <div key={book._id} className="flex-none w-64">
                        <BookCard book={book} />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              No Books Found
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default BooksPage;
