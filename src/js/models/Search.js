import axios from 'axios';
import { key, apiURL } from '../config';

export default class Search {


    constructor(query) {
        this.query = query;
    }

    // http://food2fork.com/api/search

    // const proxy = 'https://crossorigin.me/';

    async getResults() {


        try {

            const res = await axios(`${apiURL}/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;

        } catch (error) {

            console.log('There was an error');

        }

    }


}