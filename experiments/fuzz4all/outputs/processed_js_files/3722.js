Certainly! Below is a JavaScript program that uses some advanced features such as Promises, async/await, destructuring, and ES6 modules. Note that this is just a script, and you might need to adjust it depending on your environment (Node.js or browser with module support).

 
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

 
export default function logMessage(message) {
    print(`[LOG]: ${message}`);
}

 
export const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

 
import logMessage from './logger.js';
import { add, multiply } from './mathOperations.js';
import { fetchData } from './fetchData.js';

const calculateAndLog = async () => {
    try {
        logMessage('Starting calculations...');
        
        const numbers = [1, 2, 3, 4, 5];
        const [first, second, ...rest] = numbers;
        
        const sum = add(first, second);
        const product = multiply(...rest);
        
        logMessage(`Sum of first two numbers: ${sum}`);
        logMessage(`Product of the rest: ${product}`);
        
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        logMessage(`Fetched data: ${JSON.stringify(data)}`);
        
    } catch (error) {
        logMessage(`Error: ${error.message}`);
    }
};

calculateAndLog();

### Explanation:
- **Modules**: The script is divided into multiple files using ES6 module syntax (`import` and `export`).
- **Destructuring**: Arrays and objects are destructured for easier data manipulation.
- **Async/Await and Promises**: Used for handling asynchronous operations like fetching data from a URL.
- **Arrow Functions**: Utilized for concise function expressions.
- **Error Handling**: Includes try/catch blocks to handle potential errors in asynchronous operations. 

Make sure to run this in an environment that supports ES6 modules, such as Node.js with experimental modules enabled or a modern browser.