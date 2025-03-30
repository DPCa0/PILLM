 
import fetch from 'node-fetch';  
import { v4 as uuidv4 } from 'uuid';  

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

 
async function fetchMultipleData(urls) {
    const promises = urls.map(url => fetchData(url));
    try {
        const results = await Promise.all(promises);
        return results;
    } catch (error) {
        console.error('Failed to fetch multiple data:', error);
    }
}

 
const dataLogger = (data) => new Proxy(data, {
    get(target, property) {
        print(`Accessing property "${property}": ${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
});

 
function createUUIDGenerator() {
    return () => {
        return uuidv4();
    };
}

 
function* generateSequence(start = 0, end = 10) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

 
(async function main() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const results = await fetchMultipleData(urls);

    if (results) {
        const loggedData = dataLogger(results[0] || {});

        print(loggedData.title);  

         
        loggedData.newProperty = 'New Value';

        const uuidGenerator = createUUIDGenerator();
        print(`Generated UUID: ${uuidGenerator()}`);

        const sequence = generateSequence(1, 5);
        for (let number of sequence) {
            print(`Generated number: ${number}`);
        }
    }
})();
