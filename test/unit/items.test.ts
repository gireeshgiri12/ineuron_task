const Expect = require('expect');
const request = require('supertest');
const app  = require("./../../dist/src/app");
describe('Books API', () => {
  let bookId;

  it('should add a new book', async () => {
    const newBook = {
      title: 'Test Book',
      description: "Test "
    };
    const response = await request(app)
      .post('/api/v1/items')
      .send(newBook);
    Expect(response.status).toBe(201);
    bookId = response.body._id;
  });

  it('should get a specific book', async () => {
    const response = await request(app)
      .get(`/api/v1/items/${bookId}`);
    Expect(response.status).toBe(200);
  });

  it('should update an existing book', async () => {
    const updatedBook = {
      title: 'Updated Test Book',
      description: "Update Test"
    };
    const response = await request(app)
      .put(`/api/v1/items/${bookId}`)
      .send(updatedBook);
    Expect(response.status).toBe(200);
  });

  it('should get a list of all books', async () => {
    const response = await request(app)
      .get('/api/v1/items');
    Expect(response.status).toBe(200);
    Expect(response.body.length).toBeGreaterThan(0);
  });

  it('should delete an existing book', async () => {
    const response = await request(app)
      .delete(`/api/v1/items/${bookId}`);
    Expect(response.status).toBe(204);
  });
});

