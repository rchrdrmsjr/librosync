import { motion } from "framer-motion";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "./ui/button";
import { getUserFriendlyMessage } from "@/lib/errorHandler";

/**
 * Error Fallback component for Error Boundary
 * @param {Object} props - Component props
 * @param {Error} props.error - Error object
 * @param {Function} props.resetErrorBoundary - Function to reset error boundary
 * @returns {JSX.Element} Error fallback component
 */
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const errorMessage = getUserFriendlyMessage(error);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle className="w-8 h-8 text-red-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={resetErrorBoundary}
              className="w-full sm:w-auto"
              style={{ backgroundColor: "#E0A526" }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorFallback;

