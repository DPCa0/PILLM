 
import { promises as fs } from 'fs';

 
(async function() {
     
    const data = await fs.readFile('data.json', 'utf-8').catch(err => {
        console.error("Error reading file:", err);
    });

    if (data) {
         
        const { items } = JSON.parse(data);
        
         
        const processedItems = items
            .filter(({ active }) => active)  
            .map(({ name, value }) => ({  
                name: name.toUpperCase(),
                value: value * 2
            }));

         
        const uniqueValues = new Set(processedItems.map(item => item.value));

         
        const handler = {
            get(target, prop) {
                print(`Accessing property '${prop}'`);
                return target[prop];
            }
        };

        const proxyItems = new Proxy(processedItems, handler);

         
        for (let item of proxyItems) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            print(`Processed item: ${item.name}, Value: ${item.value}`);
        }
        
         
        print(`Unique values: ${[...uniqueValues].join(', ')}`);
    }
})();

This JavaScript program demonstrates advanced features such as async/await, destructuring, arrow functions, the Set object, Proxy for property access, and using the 'fs' module for asynchronous file operations.