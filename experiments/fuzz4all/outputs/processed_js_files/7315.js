 
import fetch from 'node-fetch';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { performance } = require('perf_hooks');

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    set: function(obj, prop, value) {
        if (prop === 'age' && (value < 0 || value > 150)) {
            throw new Error('Invalid age value');
        }
        obj[prop] = value;
        return true;
    }
};

const person = new Proxy({}, handler);

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
async function* asyncDataProducer() {
    let i = 0;
    while (i < 3) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield `Data chunk ${i++}`;
    }
}

 
performance.mark('start');

 
(async function() {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);
    print('Fetched data:', data);

    person.age = 25;  
    print('Person age:', person.age);

     

    const idGen = idGenerator();
    print('Generated IDs:', idGen.next().value, idGen.next().value);

    for await (const chunk of asyncDataProducer()) {
        print(chunk);
    }

    performance.mark('end');
    performance.measure('IIFE execution time', 'start', 'end');

    const measures = performance.getEntriesByType('measure');
    measures.forEach(measure => {
        print(`${measure.name}: ${measure.duration}`);
    });
})();
