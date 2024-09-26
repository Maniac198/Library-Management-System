import request from 'supertest';
import app from '../app'; // Adjust the import path to your app
import sequelize from '../database'; // Import your Sequelize instance
import Book from '../book'; // Adjust based on your model path

describe('Library API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Force sync to start fresh
  });

  beforeEach(async () => {
    await Book.destroy({ where: {} }); // Clear the books table
  });

  afterAll(async () => {
    await sequelize.close(); // Close the connection
  });

  it('should add a book', async () => {
    const response = await request(app) // Use app directly instead of server
      .post('/books')
      .send({
        id: '1234567890',
        title: 'Test Book',
        author: 'Author Name',
        publicationYear: 2023,
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Book');
    expect(response.body.available).toBe(true); // Check if available is set to true
  });

  it('should borrow a book', async () => {
    await request(app) // Use app directly instead of server
      .post('/books')
      .send({
        id: '0987654321',
        title: 'Another Test Book',
        author: 'Another Author',
        publicationYear: 2023,
        available: true,
      });

    const response = await request(app).post('/books/0987654321/borrow');

    expect(response.status).toBe(200);
    expect(response.body.available).toBe(false); // It should now be unavailable
  });

  it('should return a book', async () => {
    await request(app) // Use app directly instead of server
      .post('/books')
      .send({
        id: '0987654321',
        title: 'Another Test Book',
        author: 'Another Author',
        publicationYear: 2023,
        available: false, // Set as unavailable initially
      });

    const response = await request(app).post('/books/0987654321/return');

    expect(response.status).toBe(200);
    expect(response.body.available).toBe(true); // It should now be available again
  });

  it('should raise an error when borrowing an unavailable book', async () => {
    await request(app) // Use app directly instead of server
      .post('/books')
      .send({
        id: '0987654321',
        title: 'Another Test Book',
        author: 'Another Author',
        publicationYear: 2023,
        available: false, // Set as unavailable
      });

    const response = await request(app).post('/books/0987654321/borrow');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'error'); // Check for status property
    expect(response.body).toHaveProperty('message', 'Book is not available for borrowing'); // Adjust based on your error structure
  });

  it('should view available books', async () => {
    await request(app) // Use app directly instead of server
      .post('/books')
      .send({
        id: '1234567890',
        title: 'Test Book',
        author: 'Author Name',
        publicationYear: 2023,
        available: true,
      });

    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true); // It should return an array
    expect(response.body.length).toBe(1); // There should be one available book
    expect(response.body[0].title).toBe('Test Book'); // Check the book title
  });
});
