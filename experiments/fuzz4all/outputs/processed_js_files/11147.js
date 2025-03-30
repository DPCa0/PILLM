Certainly! Here's a JavaScript program that utilizes advanced features such as asynchronous programming with `async`/`await`, `Promise`, destructuring, template literals, and ES6 modules:

// dataService.js
export const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

// utils.js
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// main.js
import { fetchData } from './dataService.js';
import { delay } from './utils.js';

(async () => {
    try {
        const url = 'https: 
        print('Fetching data...');
        
        const [data1, data2] = await Promise.all([
            fetchData(url),
            delay(2000).then(() => fetchData(url))
        ]);

        const combinedData = [...data1, ...data2];
        
        combinedData.slice(0, 3).forEach(({ userId, title, body }, index) => {
            print(`\nPost #${index + 1}:`);
            print(`User ID: ${userId}`);
            print(`Title: ${title}`);
            print(`Body: ${body}`);
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

In this program, we have three files: `dataService.js`, `utils.js`, and `main.js`. We import functions from these modules and use them in an asynchronous function to fetch data from a public API, demonstrating the use of destructuring and template literals to handle and display the fetched data.