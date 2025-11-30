import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import QueryProvider from "./providers/QueryProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App.jsx";
import "./lib/i18n";
import "./global.css";

// Register service worker for PWA (production only)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Service worker registration failed, continue without it
    });
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryProvider>
          <App />
        </QueryProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
