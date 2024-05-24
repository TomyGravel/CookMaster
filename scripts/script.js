document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
    const modalRecipeName = document.getElementById('modal-recipe-name');
    const modalRecipeIngredients = document.getElementById('modal-recipe-ingredients');
    const modalRecipeSteps = document.getElementById('modal-recipe-steps');
    const modalRecipeNutrition = document.getElementById('modal-recipe-nutrition');

    recipeForm.addEventListener('submit', (e) => {
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
        saveRecipe(recipe);
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

    function saveRecipe(recipe) {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
        } else {
            recipes = [];
        }
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    function loadRecipes() {
        let recipes = localStorage.getItem('recipes');
        if (recipes) {
            recipes = JSON.parse(recipes);
            recipes.forEach(addRecipeToList);
        }
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
        // Simple sum for demonstration, could be expanded with actual proportion calculation
        const protein = nutrition.reduce((sum, value) => sum + value, 0);
        const carbs = nutrition.reduce((sum, value) => sum + value, 0);
        const fat = nutrition.reduce((sum, value) => sum + value, 0);
        return { protein, carbs, fat };
    }

    loadRecipes();

    // Ajouter la recette de porridge par défaut
    const porridgeRecipe = {
        name: 'Porridge',
        ingredients: 'Flocons d\'avoine, lait d\'amande, beurre de cacahuète, graines de chia, amandes, noix, sirop d\'agave, fruits rouges, banane, yaourt soja vanille',
        steps: '1. Mélanger les flocons d\'avoine et le lait d\'amande.\n2. Chauffer à feu moyen jusqu\'à ce que le mélange épaississe.\n3. Ajouter le beurre de cacahuète et les graines de chia.\n4. Garnir avec les amandes, les noix, le sirop d\'agave, les fruits rouges, la banane et le yaourt soja vanille.',
        nutrition: [5, 25, 10]  // Exemple de valeurs pour les macronutriments par 100g
    };
    addRecipeToList(porridgeRecipe);
    saveRecipe(porridgeRecipe);
});
