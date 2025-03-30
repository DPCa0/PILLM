 
import { readFile } from 'fs/promises';

 
async function processData(filePath) {
  try {
     
    const data = await readFile(filePath, 'utf-8');
    
     
    const parsedData = JSON.parse(data);
    
     
    const { name = 'Unknown', age = 0, details = {} } = parsedData;
    
     
    const handler = {
      get: (target, property) => {
        print(`Property '${property}' accessed`);
        return target[property];
      }
    };
    const proxiedDetails = new Proxy(details, handler);
    
     
    const email = proxiedDetails?.email ?? 'Not provided';

     
    print(`Name: ${name}, Age: ${age}, Email: ${email}`);
    
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

 
(async () => {
  await processData('./data.json');
})();

Please ensure to replace `'./data.json'` with an actual path to your JSON file for testing. The script reads a JSON file and uses advanced JavaScript features like Promises, async/await, destructuring, Proxy, optional chaining, and template literals.