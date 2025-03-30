 
import { readFile } from 'fs/promises';
import { resolve } from 'path';

 
async function readJsonFile(filePath) {
    try {
        const fullPath = resolve(filePath);
        const data = await readFile(fullPath, 'utf-8');
        const jsonData = JSON.parse(data);
        print('JSON Data:', jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
    }
}

 
async function fetchApiData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const apiData = await response.json();
        print('API Data:', apiData);
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
}

 
const targetObject = { message: 'Hello, Proxy!' };
const handler = {
    get: (target, prop, receiver) => {
        print(`Property "${prop}" has been accessed.`);
        return Reflect.get(target, prop, receiver);
    }
};

const proxiedObject = new Proxy(targetObject, handler);
print(proxiedObject.message);  

 
const jsonFilePath = './sample.json';   
const sampleApiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

readJsonFile(jsonFilePath);
fetchApiData(sampleApiUrl);
