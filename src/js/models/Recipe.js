import axios from 'axios';
import { key, apiURL } from '../config';

export default class Receipe {

    constructor(id){
        this.id = id;
    }

    async getRecipe(){

        try {
            
            const res = await axios(`${apiURL}/api/get?key=${key}&rId=${this.id}`);

            // BUILD OBJECT PROPERTIES
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.image = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

            console.log(res);

        } catch (error) {
            console.log(`Something went wrong: ${error}`)
        }

    }


    calcTime() {

        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;

    }

    calcServings() {
        this.servings = 4;
    }

}