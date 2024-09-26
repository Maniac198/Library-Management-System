import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
import Library from '../library'; // Adjust the import path as necessary
import Book from '../book'; // Adjust the import path as necessary
import sequelize from '../database'; // Import your Sequelize instance

describe('Library', () => {
  // Create a new instance of the Library class for testing
  const library = new Library();

  // Run before all tests
  beforeAll(async () => {
    // Sync the database and create tables
    await sequelize.sync({ force: true }); // This drops and recreates tables for testing
  });

  // Run after all tests
  afterAll(async () => {
    // Close the Sequelize connection
    await sequelize.close();
  });

  it('should add a book', async () => {
    await library.addBook({ id: '1234567890', title: 'Test Book', author: 'Author Name', publicationYear: 2023, available: true });

    const books = await library.viewAvailableBooks();
    expect(books.length).toBe(1);
    expect(books[0].title).toBe('Test Book');
  });

  it('should borrow a book', async () => {
    await library.addBook({ id: '0987654321', title: 'Another Test Book', author: 'Another Author', publicationYear: 2023, available: true });

    await library.borrowBook('0987654321');
    const books = await library.viewAvailableBooks();
    expect(books.length).toBe(1); // Only the first book should be available
    expect(books[0].title).toBe('Test Book');
  });

  it('should return a book', async () => {
    await library.returnBook('0987654321');

    const books = await library.viewAvailableBooks();
    expect(books.length).toBe(2); // Both books should now be available
  });

  it('should raise an error when borrowing an unavailable book', async () => {
    await expect(library.borrowBook('1234567890')).rejects.toThrow('Book is not available');
  });

  it('should view available books', async () => {
    const books = await library.viewAvailableBooks();
    expect(books.length).toBe(2); // Both books should be available
  });
});
