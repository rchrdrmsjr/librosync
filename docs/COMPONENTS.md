# Component Documentation

## Overview
This document describes the main components used in the LibroSync application.

## Core Components

### Header
**Location:** `src/components/header.jsx`

Navigation header with sticky behavior, backdrop blur, and mobile menu.

**Features:**
- Sticky header with scroll detection
- Smooth scroll navigation
- Mobile-responsive sheet menu
- Accessibility features (ARIA labels, skip link)

### HeroSection
**Location:** `src/components/hero-section.jsx`

Main hero banner with parallax effects and animated text.

**Features:**
- Parallax scrolling background
- Animated gradient overlay
- Floating particle effects
- Call-to-action button

### BookCard
**Location:** `src/components/cards/book-card.jsx`

Card component for displaying book information.

**Props:**
- `book` (Object): Book data object

**Features:**
- 3D hover effects
- Image zoom on hover
- Availability badge
- Favorites button

### BookDetailModal
**Location:** `src/components/BookDetailModal.jsx`

Modal for displaying detailed book information.

**Props:**
- `book` (Object): Book data object
- `isOpen` (boolean): Modal open state
- `onClose` (Function): Close handler

### SearchBar
**Location:** `src/components/searchbar.jsx`

Search input component with accessibility features.

**Props:**
- `value` (string): Search query value
- `onChange` (Function): Change handler
- `className` (string): Additional CSS classes

### EmptyState
**Location:** `src/components/EmptyState.jsx`

Reusable empty state component.

**Props:**
- `icon` (Component): Icon component
- `title` (string): Title text
- `description` (string): Description text
- `action` (ReactNode): Optional action button

### Pagination
**Location:** `src/components/Pagination.jsx`

Pagination component for navigating through pages.

**Props:**
- `currentPage` (number): Current page number
- `totalPages` (number): Total number of pages
- `onPageChange` (Function): Page change handler

## Hooks

### useBooksQuery
**Location:** `src/hooks/useBooksQuery.jsx`

React Query hook for fetching books.

**Returns:**
- `books` (Array): Array of books
- `loading` (boolean): Loading state
- `error` (string|null): Error message
- `refetch` (Function): Refetch function

### useDebounce
**Location:** `src/hooks/useDebounce.jsx`

Hook for debouncing values.

**Parameters:**
- `value` (*): Value to debounce
- `delay` (number): Delay in milliseconds (default: 300)

### useFavorites
**Location:** `src/hooks/useFavorites.jsx`

Hook for managing favorite books.

**Returns:**
- `favorites` (Array): Array of favorite book IDs
- `addFavorite` (Function): Add book to favorites
- `removeFavorite` (Function): Remove book from favorites
- `toggleFavorite` (Function): Toggle favorite status
- `isFavorite` (Function): Check if book is favorited

