// search.test.js

const request = require('supertest');
const app = require('./index'); // Import your Express app

describe('GET /search', () => {
  it('should return a list of cocktails matching the search term', async () => {
    const searchTerm = 'margarita'; // Example search term
    const response = await request(app).get(`/search?name=${searchTerm}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    
  });
  test('should handle missing name query parameter', async () => {
    const response = await request(app).get('/search');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Name query parameter is required' });
  });
    test('should handle empty name query parameter', async () => {
        const response = await request(app).get('/search?name=');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Name query parameter is required' });
    });
    test('should handle invalid name query parameter', async () => {
        const response = await request(app).get('/search?name=InvalidName');
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch data from The Cocktail DB' });
    });
    test('should handle pagination', async () => {
        const response = await request(app).get('/search?name=margarita&page=1&limit=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    
});
