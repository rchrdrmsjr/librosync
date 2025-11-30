import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Pagination component
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Callback when page changes
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Pagination component
 */
const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="focus:ring-2 focus:ring-[#E0A526]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Previous</span>
        </Button>
      </motion.div>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500">
                ...
              </span>
            );
          }

          return (
            <motion.div
              key={page}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => onPageChange(page)}
                className={
                  currentPage === page
                    ? "bg-[#E0A526] text-white hover:bg-[#C28A1A] focus:ring-2 focus:ring-[#E0A526]"
                    : "focus:ring-2 focus:ring-[#E0A526]"
                }
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </Button>
            </motion.div>
          );
        })}
      </div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="focus:ring-2 focus:ring-[#E0A526]"
        >
          <ChevronRight className="w-4 h-4" />
          <span className="sr-only">Next</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default Pagination;

