import Search from './models/Search';

// GLOBAL APPLICATION STATE

/**
 * Search Object
 * Current Recipe Object
 * Shopping List Object
 * Liked Recipes
 */
const state = {

};

/**
 * Search functional
 */
const controlSearch = async () => {
    // GET QUERY FROM VIEW
    const query = 'pizza';

    //CREATE NEW SEARCH OBJECT
    if(query){
        // NEW SEARCH OBJECT AND ADD IT TO STATE
        state.search = new Search(query);

        // PREPARE THE INTERFACE - LOADING SPINNER ETC.

        // SEARCH FOR RECIPES
        await state.search.getResults();
        
        // RENDER RESULTS ON UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

const search = new Search('pizza');
console.log(search);
search.getResults();


