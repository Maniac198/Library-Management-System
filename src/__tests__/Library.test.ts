import Library from '../library';
import Book from '../book';

// Create a new instance of Library
const library = new Library();

describe('Library Management System', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    await Book.sync({ force: true }); // This will drop the table if it exists
  });

  afterAll(async () => {
    // Close the database connection after tests
    await Book.sequelize.close();
  });

  test('should add a book to the library', async () => {
    const bookData = {
      id: '12345',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publicationYear: 1925,
    };
    const book = await library.addBook(bookData);
    expect(book.title).toBe(bookData.title);
    expect(book.available).toBe(true);
  });

  test('should borrow a book from the library', async () => {
    const bookId = '12345';
    const borrowedBook = await library.borrowBook(bookId);
    expect(borrowedBook.available).toBe(false);
  });

  test('should throw an error when borrowing an unavailable book', async () => {
    // Borrow the book again
    await library.borrowBook('12345');
    
    await expect(library.borrowBook('12345')).rejects.toThrow('Book is not available for borrowing');
  });

  test('should return a borrowed book', async () => {
    const returnedBook = await library.returnBook('12345');
    expect(returnedBook.available).toBe(true);
  });

  test('should throw an error when returning a book that does not exist', async () => {
    await expect(library.returnBook('non-existing-id')).rejects.toThrow('Book not found');
  });

  test('should list available books', async () => {
    const availableBooks = await library.viewAvailableBooks();
    expect(availableBooks.length).toBeGreaterThan(0);
    expect(availableBooks[0].available).toBe(true);
  });
});
