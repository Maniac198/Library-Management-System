import Book from './book'; // Import the Book model

class Library {
  async addBook(bookData: { id: string; title: string; author: string; publicationYear: number; available?: boolean }) {
    // Adjust bookData to include the 'available' property if not provided
    const book = await Book.create({
      ...bookData,
      available: bookData.available !== undefined ? bookData.available : true, // Default to true if not specified
    });
    return book;
  }

  async borrowBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book || !book.available) {
      throw new Error('Book is not available for borrowing');
    }
    book.available = false; // Mark as unavailable
    await book.save(); // Save the changes to the database
    return book; // Return the updated book object
  }

  async returnBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    book.available = true; // Mark as available
    await book.save(); // Save the changes to the database
    return book; // Return the updated book object
  }

  async viewAvailableBooks() {
    // Query to find all available books
    const availableBooks = await Book.findAll({ where: { available: true } });
    return availableBooks; // Return the list of available books
  }
}

export default Library;
