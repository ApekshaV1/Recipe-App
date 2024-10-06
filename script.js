const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');
const recipeContainer = document.querySelector('.recipe-container');

// Function to get recipes
const fetchRecipes = async (query) => {
    // Correct URL and query parameter
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    
    // Clear previous results
    recipeContainer.innerHTML = '';
    
    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');  // Create div tag in JavaScript
            recipeDiv.classList.add('recipe');
            
            // Proper use of template literals in innerHTML
            recipeDiv.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h3>${meal.strMeal}</h3>
                <p><span>${meal.strArea} </span>Dish</p>
                <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            `;
            const button= document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            //Adding Event Listener to recipe button
            button.addEventListener('click',()=>{
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    } else {
        recipeContainer.innerHTML = `<p>No results found</p>`;
    }
}

//Function to fetch Ingredients and measurements
const fetchIngredients=(meal)=>{
    let ingredientsList ="";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`;
        }
        else{
            break;
        }
    } 
    return ingredientsList;
}


const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML =`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions>
            <h3>Instructions:</h3>
            <p ">${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display ="block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none"; // Use parentElement instead of parsetElement
});


// Event listener for search button
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent page refresh on click
    const searchInput = searchBox.value.trim();
    
    if (!searchInput) {
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`;
        return;
        
    }
    fetchRecipes(searchInput);
});



