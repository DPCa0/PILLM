 

 
export const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

 
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
import { fetchData } from './dataModule.js';
import { delay } from './utility.js';

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';

    try {
        print('Fetching data...');
        const dataPromise = fetchData(url);
        
         
        await delay(1000);
        
        const { userId, id, title, body } = await dataPromise;
        
        console.log(`Data received:\n
        User ID: ${userId}
        Post ID: ${id}
        Title: ${title}
        Body: ${body}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

This program uses ES6 modules to organize the code, async/await for asynchronous operations, Promises for handling asynchronous tasks like delaying execution, destructuring to extract properties from objects, and template literals for string interpolation. It demonstrates a complex and modern JavaScript code structure.