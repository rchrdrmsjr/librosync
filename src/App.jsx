import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { Loader2 } from "lucide-react";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home"));
const BooksPage = lazy(() => import("./pages/books/Books"));
const BookDetail = lazy(() => import("./pages/books/BookDetail"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="w-8 h-8 text-[#E0A526] animate-spin" />
  </div>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
