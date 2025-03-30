 
import { readFile } from 'fs/promises';
import fetch from 'node-fetch';

 
async function fetchDataAndReadFile() {
     
    const [apiData, fileData] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json()),
        readFile('./sample.txt', 'utf8')
    ]);

     
    const { userId, title } = apiData;
    print(`API Data - UserId: ${userId}, Title: ${title}`);
    print(`File Data - Content: ${fileData}`);

     
    const uniqueChars = new Set([...fileData]);
    print(`Unique Characters in File: ${[...uniqueChars].join(', ')}`);

     
    const charCounts = [...uniqueChars].map(char => {
        return { char, count: fileData.split(char).length - 1 };
    });

    print('Character Counts:', charCounts);
}

 
(async () => {
    try {
        await fetchDataAndReadFile();
    } catch (error) {
        console.error('Error:', error);
    }
})();
Note: This script uses ES6 modules and async/await features, and assumes a file named `sample.txt` exists in the same directory for reading. The `node-fetch` package should be installed to use the fetch API in Node.js.