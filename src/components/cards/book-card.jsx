import { Badge } from "@/components/ui/badge";

const BookCard = ({ book }) => {
  const isAvailable = book.availableCount > 0;

  return (
    <div
      key={book._id}
      className="overflow-hidden rounded-2xl shadow-md transition hover:shadow-lg bg-white"
    >
      {/* Book Cover */}
      <div className="relative w-full aspect-[2.8/4]">
        <img
          src={book.picture}
          alt={book.title}
          className="w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-2 justify-end">
          <Badge
            className={`text-xs px-2 py-1 ${
              isAvailable
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isAvailable ? `${book.availableCount} available` : "Unavailable"}
          </Badge>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-primary line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 -mt-1">by {book.author}</p>k
        <div className="text-sm text-gray-700 space-y-1 pt-1">
          {book.genre?.length > 0 && (
            <p>
              <span className="font-semibold">Genre:</span>{" "}
              {book.genre.join(", ")}
            </p>
          )}

          {/* uncledev */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
