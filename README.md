# LibroSync - Southville 8B E-Library

A modern, accessible e-library web application for browsing books, reading announcements, and accessing library services.

## Features

- 📚 Browse and search books by category, genre, and availability
- 🔍 Advanced search with debouncing
- ⭐ Favorites system with localStorage
- 📱 Progressive Web App (PWA) support
- ♿ Full accessibility support (WCAG AA)
- 🎨 Beautiful animations and transitions
- 📊 Analytics integration ready
- 🔄 Offline support with service worker
- 🎯 SEO optimized with structured data

## Tech Stack

- React 19
- Vite
- TanStack Query (React Query)
- Framer Motion
- Tailwind CSS
- Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```bash
   VITE_API_BASE_URL=https://api-backend-urlr.onrender.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## Project Structure

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Documentation

- [Components](docs/COMPONENTS.md) - Component documentation
- [API](docs/API.md) - API endpoint documentation
- [Contributing](docs/CONTRIBUTING.md) - Contribution guidelines
- [Architecture](docs/ARCHITECTURE.md) - Architecture overview

## Environment Variables

See `.env.example` for required environment variables.

## License

This project is for Southville 8B E-Library use.
