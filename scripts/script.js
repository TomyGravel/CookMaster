document.addEventListener('DOMContentLoaded', () => {
    const recipesList = document.getElementById('recipe-list');
    const recipeForm = document.getElementById('recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const recipeStepsInput = document.getElementById('recipe-steps');
    const recipeNutritionInput = document.getElementById('recipe-nutrition');

    // Fetch and display recipes
    const fetchRecipes = async () => {
        const response = await fetch('http://localhost:3000/api/recipes');
        const recipes = await response.json();
        recipesList.innerHTML = '';
        recipes.forEach(recipe => {
            const listItem = document.createElement('div');
            listItem.className = 'recipe';
            listItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p><strong>Ingrédients:</strong> ${recipe.ingredients}</p>
                <p><strong>Étapes:</strong> ${recipe.steps}</p>
                <p><strong>Macronutriments:</strong> ${recipe.nutrition}</p>
            `;
            recipesList.appendChild(listItem);
        });
    };

    // Save a new recipe
    recipeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const recipe = {
            name: recipeNameInput.value,
            ingredients: recipeIngredientsInput.value,
            steps: recipeStepsInput.value,
            nutrition: recipeNutritionInput.value
        };
        await fetch('http://localhost:3000/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });
        fetchRecipes();
        recipeForm.reset();
    });

    fetchRecipes();
});
