import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, User, Tag, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import FavoritesButton from "./FavoritesButton";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { useEffect, useRef } from "react";
import { trackBookView } from "@/lib/analytics";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

/**
 * BookDetailModal component for displaying book details
 * @param {Object} props - Component props
 * @param {Object} props.book - Book object
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @returns {JSX.Element} BookDetailModal component
 */
const BookDetailModal = ({ book, isOpen, onClose }) => {
  const { addToHistory } = useReadingHistory();
  const trackedRef = useRef(false);

  useEffect(() => {
    if (isOpen && book && !trackedRef.current) {
      addToHistory(book);
      trackBookView(book._id, book.title);
      trackedRef.current = true;
    }
    
    // Reset tracking when modal closes
    if (!isOpen) {
      trackedRef.current = false;
    }
  }, [isOpen, book]); // Removed addToHistory from deps to prevent infinite loops

  if (!book) return null;

  const isAvailable = book.availableCount > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <DialogTitle className="text-2xl font-bold text-primary flex-1">
                  {book.title}
                </DialogTitle>
                <FavoritesButton bookId={book._id} className="ml-4" />
              </div>
              <DialogDescription className="sr-only">
                Detailed information about {book.title} by {book.author}
              </DialogDescription>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              {/* Book Cover */}
              <div className="relative">
                <motion.img
                  src={book.picture}
                  alt={`${book.title} cover`}
                  className="w-full rounded-lg shadow-lg object-cover"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-2 right-2">
                  <Badge
                    className={`text-xs px-3 py-1 ${
                      isAvailable
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1 inline" />
                        {book.availableCount} available
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1 inline" />
                        Unavailable
                      </>
                    )}
                  </Badge>
                </div>
              </div>

              {/* Book Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <User className="w-4 h-4" />
                    <span>by {book.author}</span>
                  </div>
                </div>

                {book.description && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}

                {book.genre && book.genre.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Genres
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {book.genre.map((genre, index) => (
                        <Badge key={index} variant="secondary">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {book.category && book.category.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                    <div className="flex flex-wrap gap-2">
                      {book.category.map((cat, index) => (
                        <Badge key={index} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {book.isbn && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">ISBN</h4>
                    <p className="text-gray-600">{book.isbn}</p>
                  </div>
                )}

                {book.publisher && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Publisher
                    </h4>
                    <p className="text-gray-600">{book.publisher}</p>
                  </div>
                )}

                {book.publishedDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Published: {book.publishedDate}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default BookDetailModal;

