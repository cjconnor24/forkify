import { elements } from './base';
export const getInput = () => elements.searchInput.value;


export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

// EMPTY THE TEXT BOX
export const clearInput = () => {
    elements.searchInput.value = '';
};

// FUNCTION TO RENDER AN INDIVIDUAL RECIPE
const renderRecipe = recipe => {

    const markup = `<li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${recipe.title}</h4>
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