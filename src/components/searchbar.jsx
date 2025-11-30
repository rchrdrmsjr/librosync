import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { trackSearch } from "@/lib/analytics";

/**
 * SearchBar component for searching books
 * @param {Object} props - Component props
 * @param {string} props.value - Search input value
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = ({ value, onChange, className }) => {
  return (
    <div className={`relative w-full ${className}`} role="search">
      <label htmlFor="search-input" className="sr-only">
        Search books by title or author
      </label>
      <Search 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" 
        aria-hidden="true"
      />
      <Input
        id="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title, author..."
        className="pl-9 sm:pl-10 bg-white text-gray-900 rounded-full focus:ring-2 focus:ring-[#E0A526] focus:ring-offset-2 w-full min-h-[44px] text-base sm:text-sm"
        aria-label="Search books by title or author"
        aria-describedby="search-description"
      />
      <span id="search-description" className="sr-only">
        Enter book title or author name to search
      </span>
    </div>
  );
};

export default SearchBar;
