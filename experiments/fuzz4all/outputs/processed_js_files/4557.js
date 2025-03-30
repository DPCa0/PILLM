 

 
import { readFile } from 'fs/promises';
import EventEmitter from 'events';

 
async function readJsonFile(filePath) {
    try {
        const data = await readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Error reading JSON file');
    }
}

 
class CustomEmitter extends EventEmitter {
    constructor() {
        super();
    }

    emitData(data) {
        this.emit('dataReceived', data);
    }
}

 
function* asyncGenerator(data) {
    for (const item of data) {
        yield new Promise((resolve) => setTimeout(() => resolve(item), 1000));
    }
}

 
(async function main() {
    const filePath = './data.json';  

    try {
         
        const jsonData = await readJsonFile(filePath);
        
         
        const emitter = new CustomEmitter();
        
         
        emitter.on('dataReceived', (data) => {
            print('Event Triggered with Data:', data);
        });

         
        const asyncIterator = asyncGenerator(jsonData);

        for await (const data of asyncIterator) {
            print('Processing Data:', data);
            emitter.emitData(data);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
