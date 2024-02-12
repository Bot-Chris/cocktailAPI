// index.js

const express = require('express');
const axios = require('axios');

const request = require('supertest');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Cocktail DB Wrapper API!');
});
module.exports = app;

// Search by Name
app.get('/search', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name query parameter is required' });
    }

    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const cocktails = response.data.drinks; // The API returns an array of drinks

        // Implementing Pagination (Example: ?page=1&limit=10)
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedCocktails = cocktails.slice(startIndex, endIndex);

        res.json(paginatedCocktails);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from The Cocktail DB' });
    }
});


// Filter by Category
app.get('/filter/category', async (req, res) => {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json({ error: 'Category query parameter is required' });
    }

    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`;

    try {
        const response = await axios.get(apiUrl);
        const cocktails = response.data.drinks; // Assuming this is the array of cocktails

        // Implement pagination
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedCocktails = cocktails.slice(startIndex, endIndex);

        res.json(paginatedCocktails);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data from The Cocktail DB' });
    }
});


// Filter by Ingredient
app.get('/filter/ingredient', async (req, res) => {
    const { ingredients } = req.query; // e.g., "gin,lemon,sugar"

    if (!ingredients) {
        return res.status(400).json({ error: 'Ingredients query parameter is required' });
    }

    const ingredientList = ingredients.split(',');
    const cocktailsByIngredient = await Promise.all(ingredientList.map(async (ingredient) => {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return response.data.drinks; // Assuming this returns an array of cocktails
    }));

    // Aggregating and filtering results to find common cocktails across all ingredients
    const commonCocktails = cocktailsByIngredient.reduce((common, cocktails) => {
        if (!common) return cocktails;
        return common.filter(commonCocktail => cocktails.some(cocktail => cocktail.idDrink === commonCocktail.idDrink));
    });

    // Apply pagination here 

    res.json(commonCocktails);
});


// Filter by Alcoholic
app.get('/filter/alcoholic', async (req, res) => {
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({ error: 'Alcoholic type query parameter is required' });
    }

    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(type)}`;

    try {
        const response = await axios.get(apiUrl);
        const cocktails = response.data.drinks; // Assuming this is the array of cocktails

        // Implement pagination
        const { page = 1, limit = 10 } = req.query;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedCocktails = cocktails.slice(startIndex, endIndex);

        res.json(paginatedCocktails);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch data from The Cocktail DB' });
    }
});




