import { Component } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { logError } from "@/lib/errorHandler";
import { captureException } from "@/lib/errorTracking";

/**
 * Error Boundary component to catch React errors
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Error boundary wrapper
 */
const ErrorBoundary = ({ children }) => {
  const handleError = (error, errorInfo) => {
    logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
    captureException(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
    });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Reset app state if needed
        window.location.href = "/";
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;

