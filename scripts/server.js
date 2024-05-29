const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cookmaster', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Recipe Schema
const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
    nutrition: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.post('/api/recipes', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).send(newRecipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
