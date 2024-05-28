const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cookmaster', { useNewUrlParser: true, useUnifiedTopology: true });

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  steps: String,
  nutrition: [Number]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Routes
app.post('/recipes', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).send(recipe);
});

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.send(recipes);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

