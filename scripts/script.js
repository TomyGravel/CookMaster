document.addEventListener('DOMContentLoaded', () => {
  const recipeForm = document.getElementById('recipe-form');
  const recipeList = document.getElementById('recipe-list');

  recipeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('recipe-name').value;
      const ingredients = document.getElementById('recipe-ingredients').value;
      const steps = document.getElementById('recipe-steps').value;
      const nutritionInput = document.getElementById('recipe-nutrition').value;
      const nutrition = nutritionInput.split(',').map(n => parseFloat(n.trim()));

      const recipe = {
          name,
          ingredients,
          steps,
          nutrition
      };

      addRecipeToList(recipe);
      await saveRecipe(recipe);
      recipeForm.reset();
  });

  function addRecipeToList(recipe) {
      const recipeItem = document.createElement('div');
      recipeItem.classList.add('card', 'mb-3');
      recipeItem.innerHTML = `
          <div class="card-body">
              <h3 class="card-title">${recipe.name}</h3>
              <p class="card-text"><strong>Ingrédients:</strong> ${recipe.ingredients}</p>
              <button class="btn btn-primary" data-toggle="modal" data-target="#recipeModal" onclick='showRecipeDetails(${JSON.stringify(recipe)})'>Voir Détails</button>
          </div>
      `;
      recipeList.appendChild(recipeItem);
  }

  async function saveRecipe(recipe) {
      const response = await fetch('http://localhost:3000/recipes', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(recipe)
      });
      return await response.json();
  }

  async function loadRecipes() {
      const response = await fetch('http://localhost:3000/recipes');
      const recipes = await response.json();
      recipes.forEach(addRecipeToList);
  }

  window.showRecipeDetails = function(recipe) {
      modalRecipeName.innerText = recipe.name;
      modalRecipeIngredients.innerText = recipe.ingredients;
      modalRecipeSteps.innerText = recipe.steps;
      const nutrition = calculateNutrition(recipe.nutrition);
      modalRecipeNutrition.innerText = `Protéines: ${nutrition.protein}g, Glucides: ${nutrition.carbs}g, Lipides: ${nutrition.fat}g`;
      recipeModal.show();
  }

  function calculateNutrition(nutrition) {
      const protein = nutrition.reduce((sum, value) => sum + value, 0);
      const carbs = nutrition.reduce((sum, value) => sum + value, 0);
      const fat = nutrition.reduce((sum, value) => sum + value, 0);
      return { protein, carbs, fat };
  }

  loadRecipes();
});
