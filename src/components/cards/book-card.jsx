import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book, onClick }) => {
  const navigate = useNavigate();
  const isAvailable = book.availableCount > 0;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(book);
    } else {
      navigate(`/books/${book._id}`);
    }
  };

  return (
    <motion.div
      key={book._id}
      className="overflow-hidden rounded-2xl shadow-md bg-white h-full flex flex-col cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${book.title} by ${book.author}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Book Cover */}
      <div className="relative w-full aspect-[2.8/4] overflow-hidden">
        <motion.img
          src={book.picture}
          alt={`${book.title} by ${book.author}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Badges */}
        <motion.div
          className="absolute top-2 right-2 flex flex-wrap gap-2 justify-end z-10 items-start"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge
            className={`text-xs px-2 py-1 ${
              isAvailable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isAvailable ? `${book.availableCount} available` : "Unavailable"}
          </Badge>
        </motion.div>

        {/* Hover overlay with book info preview */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs font-medium line-clamp-2">{book.title}</p>
        </motion.div>
      </div>

      {/* Book Info */}
      <motion.div
        className="p-4 space-y-2 flex-1 flex flex-col"
        animate={{
          backgroundColor: isHovered ? "rgba(224, 165, 38, 0.05)" : "rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-base font-semibold text-primary line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">by {book.author}</p>
        <div className="text-sm text-gray-700 space-y-1 pt-1 mt-auto">
          {book.genre?.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="font-semibold">Genre:</span>{" "}
              {book.genre.join(", ")}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookCard;
