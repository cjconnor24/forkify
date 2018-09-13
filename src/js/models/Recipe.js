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

    parseIngredients(){

        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const newIngredients = this.ingredients.map(el => {
            // UNIFORM INGREDS
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit,i) => {
                ingredient = ingredient.replace(unit,unitsShort[i]);
            });

            // REMOVE PARENTHESIS
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => unitsShot.includes(el2));

            let objIng;

            if(unitIndex > -1){
                
                // THERE IS A UNIT
                const arrCount = arrIng.slice(0, unitIndex);

                let count;

                if(arrCount.length === 1){
                    count = eval(arrInc[0].replace('-','+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex+1).join(' ')
                }


            } else if(parseInt(arrIng[0], 10)) {
                // THERE IS NO UNIT BUT 1ST ELEMENT IS NUMBER
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            } else if(unitIndex === -1){
                // THERE IS NO UNIT AND NO NUMBER IN 1st POST
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            // PARSE INGREDIENTS INTO COUNT UNIT AND INGREDIENT

            return objIng;
        });
        this.ingredients = newIngredients;

    }

}