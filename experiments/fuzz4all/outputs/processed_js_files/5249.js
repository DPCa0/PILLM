 
const fs = require('fs').promises;

 
async function complexAsyncOperation() {
    try {
         
        const data = await fs.readFile('example.txt', 'utf8');
        print(`File data: ${data}`);

         
        const uniqueChars = new Set(data.replace(/\s+/g, '').split(''));
        print('Unique characters:', [...uniqueChars]);

         
        const charCodes = [...uniqueChars].map(char => char.charCodeAt(0));
        print('Character codes:', charCodes);

         
        const sumCharCodes = charCodes.reduce((sum, code) => sum + code, 0);
        print('Sum of character codes:', sumCharCodes);

         
        const resultMessage = `The sum of unique character codes is: ${sumCharCodes}`;
        print(resultMessage);

         
        await fs.writeFile('result.txt', resultMessage);
    } catch (error) {
        console.error('Error:', error);
    }
}

 
const options = {
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }
};

const { url, ...httpOptions } = options;

 
const fetch = require('node-fetch');

async function fetchData() {
    try {
        const response = await fetch(url, httpOptions);
        const json = await response.json();

         
        print(`Fetched Title: ${json?.title ?? 'No title available'}`);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
complexAsyncOperation();
fetchData();

To execute this program, make sure you have Node.js and the `node-fetch` package installed, and ensure that there is an `example.txt` file present with some text content. This program utilizes