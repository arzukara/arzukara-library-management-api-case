# Library Management API

A TypeScript-based REST API for library management system using Express.js and Prisma.

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Unzip/Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Start server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:userId` - Get user details with books
- `POST /users/:userId/borrow/:bookId` - Borrow a book
- `POST /users/:userId/return/:bookId` - Return a book

### Books
- `GET /books` - Get all books
- `POST /books` - Create a new book
- `GET /books/:bookId` - Get book details with score

## Database

This project uses SQLite with Prisma ORM. The development database (`dev.db`) is included in the repository for easy setup.

### Database Schema

- **Users**: User management
- **Books**: Book inventory
- **Borrows**: Borrowing records with scores