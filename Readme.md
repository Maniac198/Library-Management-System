
# Library Management System

## Overview
The Library Management System is a web application that allows users to manage books, track their availability, and facilitate borrowing and returning processes. This project is built using TypeScript, Express, and Sequelize, following Test-Driven Development (TDD) principles.

## Features
- Add new books with details like ID, title, author, and publication year.
- Borrow and return books, updating their availability status.
- View a list of available books.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
  - [Using Docker](#using-docker)
  - [Manual Setup](#manual-setup)
- [API Routes](#api-routes)
- [Testing](#testing)


## Prerequisites
- Node.js (version 14 or higher)
- Docker (for Docker setup)

## Running the Application

### Using Docker
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```
2. **Build the Docker image**:
   ```bash
   docker build -t library-management-system .
   ```
3. **Run the Docker container**:
   ```bash
   docker run -p 3000:3000 library-management-system
   ```
4. **Access the application**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Manual Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/library-management-system.git
   cd library-management-system
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the application**:
   ```bash
   npm run start
   ```
4. **Access the application**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## API Routes
The application exposes the following API routes:

1. **Add a Book**  
   - **Endpoint**: `POST /books`  
   - **Request Body**:
     ```json
     {
       "id": "1234567890",
       "title": "Test Book",
       "author": "Author Name",
       "publicationYear": 2023
     }
     ```
   - **Example using Postman**:
     - Set the method to `POST`.
     - URL: `http://localhost:3000/books`
     - Body: Select `raw` and choose `JSON`, then paste the request body above.

2. **Borrow a Book**  
   - **Endpoint**: `POST /books/:id/borrow`
   - **Example using Postman**:
     - Set the method to `POST`.
     - URL: `http://localhost:3000/books/1234567890/borrow`.

3. **Return a Book**  
   - **Endpoint**: `POST /books/:id/return`
   - **Example using Postman**:
     - Set the method to `POST`.
     - URL: `http://localhost:3000/books/1234567890/return`.

4. **View Available Books**  
   - **Endpoint**: `GET /books`
   - **Example using Postman**:
     - Set the method to `GET`.
     - URL: `http://localhost:3000/books`.

## Testing
The project includes comprehensive tests to ensure functionality. The following tests have been implemented:
- **Add a Book**: Verifies if a book can be added successfully.
- **Borrow a Book**: Tests borrowing functionality and updates availability status.
- **Return a Book**: Ensures returning a book makes it available again.
- **Borrow Unavailable Book**: Validates that borrowing an unavailable book raises an appropriate error.
- **View Available Books**: Confirms that the API returns a list of available books.

To run the tests, use the command:
```bash
npm run test
```

