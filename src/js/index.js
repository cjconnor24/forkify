import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader, elementStrings } from './views/base';
// GLOBAL APPLICATION STATE

/**
 * Search Object
 * Current Recipe Object
 * Shopping List Object
 * Liked Recipes
 */
const state = {};

/**
 * Search function
 */
const controlSearch = async () => {

    // GET QUERY FROM VIEW
    const query = searchView.getInput();
    console.log(`query: ${query}`);

    //CREATE NEW SEARCH OBJECT
    if (query) {
        // NEW SEARCH OBJECT AND ADD IT TO STATE
        state.search = new Search(query);

        // PREPARE THE INTERFACE - LOADING SPINNER ETC.
        searchView.clearInput();
        searchView.clearResults();

        // ADD SPINNER
        renderLoader(elements.searchResult);

        // SEARCH FOR RECIPES
        await state.search.getResults();

        // CLEAN SPINNER
        clearLoader(elementStrings.loader);

        // RENDER RESULTS ON UI
        searchView.renderResults(state.search.result);
    } else {
        console.log('NOTHING HAPPENED');
    }
}

// ADD AN EVENT LISTENER TO THE SEARCH FORM WHEN SUBMITTED
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    
    if(btn){
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
    
});