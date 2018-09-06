import axios from 'axios';

export default class Search {


    constructor(query) {
        this.query = query;
    }

    // http://food2fork.com/api/search

    // const proxy = 'https://crossorigin.me/';

    async getResults() {

        const key = 'ea502601cf97c38abd12273a56da68ed';

        try {

            const res = await axios(`Xhttps://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;

        } catch (error) {

            console.log('There was an error');

        }

    }


}