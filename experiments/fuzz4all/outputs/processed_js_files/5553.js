 
import { EventEmitter } from 'events';
import fs from 'fs/promises';

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('Fetched Data: Advanced JavaScript'), 1000);
    });
}

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('data', async (fileName) => {
    try {
        const data = await fetchData();
        await fs.writeFile(fileName, data);
        print(`Data written to ${fileName}`);
    } catch (error) {
        console.error('Error writing file:', error);
    }
});

 
(async () => {
    try {
        const fileName = 'output.txt';
        eventEmitter.emit('data', fileName);
        
         
        const results = await Promise.all([
            fetchData(),
            new Promise(resolve => setTimeout(() => resolve('Another Promise'), 500))
        ]);

        print('All Promises Resolved:', results);

         
        const config = { port: 8080, host: 'localhost' };
        const { port = 3000, host = '127.0.0.1' } = config;
        console.log(`Server running at http: 

         
        const map = new Map([
            ['key1', 'value1'],
            ['key2', 'value2']
        ]);
        print([...map.entries()]);
    } catch (error) {
        console.error('Error in async function:', error);
    }
})();
