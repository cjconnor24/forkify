import { elements } from './base';
import { create } from 'domain';
export const getInput = () => elements.searchInput.value;


export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPagination.innerHTML = '';
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

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
</button>`;

const renderButtons = (page, numResults, resultsPerPage) => {

    const pages = Math.ceil(numResults / resultsPerPage);
    let button;

    if(page === 1 && pages > 1){
        
        // BUTTON NEXT PAGE
        button = createButton(page, 'next');

    } else if (page < pages){
        
        // BOTH BUTTONS
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;

    } else if (page === pages && pages > 1) {
        
        // BUTTON PREVIOUS PAGE
        button = createButton(page, 'prev');

    }

    // RENDER BUTTONS TO DOM
    elements.searchResultPagination.insertAdjacentHTML('afterbegin',button);

};

// LOOP THROUGH RECIPE LIST AND OUTPUT
export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
   
    // RENDER RESULTS OF CURRENT PAGE
    const start = (page -1) * resultsPerPage;
    const end = page * resultsPerPage;

    // EXTRACT THE RELEVANT RECIPES
    recipes.slice(start,end).forEach(renderRecipe);

    // RENDER BUTTONS
    renderButtons(page, recipes.length, resultsPerPage);
};