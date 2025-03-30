 

 
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

 
import { delay, fetchData } from './utils.js';

 
const complexOperation = async () => {
  try {
    print('Starting complex operation...');
    
     
    const { userId, id, title } = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched Post: ${title} by User ${userId}`);
    
     
    await delay(2000);
    print(`Operation completed for Post ID: ${id}`);
    
    return { userId, id, title };
  } catch (error) {
    console.error(`Operation failed: ${error.message}`);
  }
};

 
(async () => {
  const result = await complexOperation();
  if (result) {
    print('Complex operation result:', result);
  }
})();

This JavaScript program demonstrates an advanced use of modern JavaScript features such as ES6 modules, async/await, Promises, and object destructuring to perform a simulated complex operation. The `fetchData` function retrieves data from a placeholder API, while the `delay` function introduces artificial asynchronous behavior.