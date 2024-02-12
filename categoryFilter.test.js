// categoryFilter.test.js

const request = require('supertest');
const app = require('./index'); // Adjust the path as necessary to import your Express app

describe('Filter by Category Endpoint', () => {
  test('should return cocktails for a valid category', async () => {
    const category = 'Cocktail'; // Example of a valid category
    const response = await request(app).get(`/filter/category?category=${category}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    
  });

  test('should handle invalid categories', async () => {
    const category = 'InvalidCategory';
    const response = await request(app).get(`/filter/category?category=${category}`);

    expect(response.statusCode).toBe(500); // Assuming you return an empty array for invalid categories
    expect(response.body).toEqual({"error": "Failed to fetch data from The Cocktail DB"});
  });
  test('should handle missing category query parameter', async () => {
    const response = await request(app).get('/filter/category');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Category query parameter is required' });
  });
  test('should handle empty category query parameter', async () => {
    const response = await request(app).get('/filter/category?category=');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Category query parameter is required' });
  });
  test('should handle pagination', async () => {
    const response = await request(app).get('/filter/category?category=Cocktail&page=1&limit=10');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  test('should handle pagination', async () => {
    const response = await request(app).get('/filter/category?category=Cocktail&page=2&limit=10');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  


});
