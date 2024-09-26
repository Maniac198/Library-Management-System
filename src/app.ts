// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import Library from './library'; // Import your Library class
import AppError from './CustomError'; // Import the custom error class

const app = express();
const library = new Library();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.post('/books', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await library.addBook(req.body);
    res.status(201).json(book);
  } catch (error: any) { // Specify error type
    next(new AppError(error.message || 'Failed to add book', 400)); // Pass the error to the error handler
  }
});

app.post('/books/:id/borrow', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await library.borrowBook(req.params.id);
      res.status(200).json(book);
    } catch (error: any) { // Specify error type
      // Check if the error has a specific message to pass to AppError
      next(new AppError(error.message || 'Failed to borrow book', 400)); // Pass the error to the error handler
    }
  });
  

app.post('/books/:id/return', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await library.returnBook(req.params.id);
    res.status(200).json(book);
  } catch (error: any) { // Specify error type
    next(new AppError(error.message || 'Failed to return book', 400)); // Pass the error to the error handler
  }
});

app.get('/books', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const availableBooks = await library.viewAvailableBooks();
    res.status(200).json(availableBooks);
  } catch (error: any) { // Specify error type
    next(new AppError(error.message || 'Failed to retrieve available books', 500)); // Pass the error to the error handler
  }
});

// Error handling middleware
// Error handling middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      status: 'error', // Ensure 'status' is defined in error response
      message: err.message,
    });
  });
  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
