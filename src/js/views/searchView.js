import { elements } from './base';
export const getInput = () => elements.searchInput.value;


export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

// EMPTY THE TEXT BOX
export const clearInput = () => {
    elements.searchInput.value = '';
};

// PASTA WITH TOMATO AND SPINACH
const limitRecipeTitle = (title, limit = 17) => {

    const newTitle = [];

    if (title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if (acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

// FUNCTION TO RENDER AN INDIVIDUAL RECIPE
const renderRecipe = recipe => {

    const markup = `<li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`;

    // INSERT INTO THE DOM
    elements.searchResultList.insertAdjacentHTML("beforeend", markup);

};

// LOOP THROUGH RECIPE LIST AND OUTPUT
export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
};