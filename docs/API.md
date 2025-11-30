# API Documentation

## Base URL
```
https://api-backend-urlr.onrender.com
```

## Endpoints

### Books

#### GET /api/books
Fetch all books from the library.

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "author": "string",
    "picture": "string (URL)",
    "availableCount": "number",
    "genre": ["string"],
    "category": ["string"],
    "description": "string (optional)",
    "isbn": "string (optional)",
    "publisher": "string (optional)",
    "publishedDate": "string (optional)",
    "pages": "number (optional)"
  }
]
```

### Announcements

#### GET /api/announcements
Fetch all announcements.

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "createdAt": "string (ISO date)"
  }
]
```

## Error Handling

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Timeout
Default timeout: 30 seconds

## Caching
API responses are cached using React Query with the following settings:
- Stale time: 5 minutes
- Cache time: 15 minutes
- Retry attempts: 3
- Retry delay: Exponential backoff

