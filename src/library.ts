import Book from './book';

class Library {
  async addBook(bookData: { id: string; title: string; author: string; publicationYear: number }) {
    const book = await Book.create(bookData);
    return book;
  }

  async borrowBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book || !book.available) {
      throw new Error('Book is not available for borrowing');
    }
    book.available = false;
    await book.save();
    return book;
  }

  async returnBook(id: string) {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    book.available = true;
    await book.save();
    return book;
  }

  async viewAvailableBooks() {
    const availableBooks = await Book.findAll({ where: { available: true } });
    return availableBooks;
  }
}

export default Library;
