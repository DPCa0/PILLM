 
import { promises as fs } from 'fs';
import EventEmitter from 'events';
import { pipeline } from 'stream';
import fetch from 'node-fetch';

 
class DataEmitter extends EventEmitter {}
const dataEmitter = new DataEmitter();

 
async function processData(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        
         
        const uniqueLines = new Set(lines);
        
        uniqueLines.forEach(line => dataEmitter.emit('data', line));
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

 
function* sequenceGenerator(start = 0) {
    let count = start;
    while (true) {
        yield count++;
    }
}

 
const config = {
    retries: 3,
    timeout: 5000
};

const configProxy = new Proxy(config, {
    get(target, prop) {
        return prop in target ? target[prop] : 'Property not found';
    },
    set(target, prop, value) {
        if (typeof value === 'number' && value >= 0) {
            target[prop] = value;
            return true;
        } else {
            console.warn(`Invalid value for ${prop}: ${value}`);
            return false;
        }
    }
});

 
async function* fetchData(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            yield data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

 
async function handleMultiplePromises(promises) {
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            print('Success:', result.value);
        } else {
            print('Failure:', result.reason);
        }
    });
}

 
(async () => {
    dataEmitter.on('data', line => print('Received line:', line));

     
    const urls = ['