 

 
import { complexOperation } from './mathOperations.js';

 
class DataFetcher {
    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

 
async function main() {
    const url = 'https://api.example.com/data';

     
    DataFetcher.fetchData(url).then(data => {
        print('Data fetched:', data);

         
        const { a, b } = data;

         
        const processResults = () => print(`Processed results: ${complexOperation(a, b)}`);
        
        processResults();
    }).catch(error => console.error('Error in fetching data:', error));
}

 
(async () => {
    await main();
})();

This program demonstrates several advanced JavaScript features and patterns, including ES6 module import, async/await for handling asynchronous operations, destructuring assignment, arrow functions, a static class method, and an IIFE to encapsulate the execution logic. It requires that `mathOperations.js` is properly set up to export a `complexOperation` function.