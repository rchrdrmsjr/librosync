# Architecture Overview

## Project Structure

```
src/
├── components/       # React components
│   ├── cards/       # Card components
│   ├── ui/          # UI primitives (shadcn/ui)
│   └── ...          # Feature components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and configurations
├── pages/           # Page components
├── providers/       # Context providers
└── types/           # Type definitions (JSDoc)

public/              # Static assets
docs/                # Documentation
```

## Key Technologies

- **React 19**: UI framework
- **Vite**: Build tool
- **React Router**: Routing
- **TanStack Query**: Data fetching and caching
- **Framer Motion**: Animations
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible UI primitives

## Data Flow

1. **API Layer** (`src/lib/api.js`): Centralized API functions
2. **React Query** (`src/providers/QueryProvider.jsx`): Caching and state management
3. **Hooks** (`src/hooks/`): Custom hooks for data fetching
4. **Components**: Display data and handle user interactions

## State Management

- **Server State**: React Query (books, announcements)
- **Client State**: React hooks (favorites, reading history in localStorage)
- **UI State**: Component-level state with useState

## Performance Optimizations

- Code splitting with React.lazy()
- Image lazy loading
- Debounced search
- Memoized computations
- Service worker for offline support

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus management
- Screen reader support
- WCAG AA color contrast

## SEO

- Meta tags via react-helmet-async
- Structured data (JSON-LD)
- Semantic HTML
- Sitemap and robots.txt

