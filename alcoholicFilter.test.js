// alcoholicFilter.test.js

const request = require('supertest');
const app = require('./index'); // Ensure this points to your Express app's entry file

describe('Filter by Alcoholic Endpoint', () => {
  test('should return alcoholic cocktails', async () => {
    const response = await request(app).get('/filter/alcoholic?type=Alcoholic');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Additional assertions can be made based on the expected structure of cocktail objects
  });

  test('should handle invalid alcoholic types', async () => {
    const response = await request(app).get('/filter/alcoholic?type=InvalidType');
    expect(response.statusCode).toBe(500); // Assuming the server returns 500 for invalid types
  });
  test('should handle missing type query parameter', async () => {
    const response = await request(app).get('/filter/alcoholic');
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: 'Alcoholic type query parameter is required' });
  });
    test('should handle empty type query parameter', async () => {
        const response = await request(app).get('/filter/alcoholic?type=');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Alcoholic type query parameter is required' });
    });
    test('should handle invalid type query parameter', async () => {
        const response = await request(app).get('/filter/alcoholic?type=InvalidType');
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch data from The Cocktail DB' });
    });
    test('should handle pagination', async () => {
        const response = await request(app).get('/filter/alcoholic?type=Alcoholic&page=1&limit=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
   
   

  
});
