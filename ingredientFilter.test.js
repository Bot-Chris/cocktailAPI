const request = require('supertest');
const app = require('./index'); // Ensure this points to your Express app

describe('Cross-Ingredient Filtering', () => {
  test('returns cocktails with all specified valid ingredients', async () => {
    const response = await request(app).get('/filter/ingredient?ingredients=gin,lemon,sugar');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    // Add more detailed assertions here, possibly checking for specific expected cocktails
  });

  test('handles invalid ingredients', async () => {
    const response = await request(app).get('/filter/ingredient?ingredients=invalidIngredient1,invalidIngredient2');
    // Depending on API design, you might expect an empty array or a specific error message
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual("");
  });

    test('handles missing ingredients query parameter', async () => {
        const response = await request(app).get('/filter/ingredient');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Ingredients query parameter is required' });
    });
    test('handles empty ingredients query parameter', async () => {
        const response = await request(app).get('/filter/ingredient?ingredients=');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Ingredients query parameter is required' });
    });
    test('handles invalid ingredients query parameter', async () => {
        const response = await request(app).get('/filter/ingredient?ingredients=invalidIngredient1,invalidIngredient2');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("");
    });
    test('should handle pagination', async () => {
        const response = await request(app).get('/filter/ingredient?ingredients=gin,lemon,sugar&page=1&limit=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    test('should handle pagination', async () => {
        const response = await request(app).get('/filter/ingredient?ingredients=gin,lemon,sugar&page=2&limit=10');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    
});
