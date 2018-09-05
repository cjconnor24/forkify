import axios from 'axios';
// http://food2fork.com/api/search
const key = 'ea502601cf97c38abd12273a56da68ed';
const proxy = 'https://crossorigin.me/';

async function getResults(query){

 const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=ea502601cf97c38abd12273a56da68ed&q=pizza`);
 console.log(res);

 return res;

}
getResults('pizza').then(data => {
    console.log(data);
});
console.log('hello?');