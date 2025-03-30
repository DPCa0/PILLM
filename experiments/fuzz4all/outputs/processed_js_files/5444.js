 
import fs from 'fs/promises';
import { promisify } from 'util';
import fetch from 'node-fetch';
import crypto from 'crypto';

 
const delay = promisify(setTimeout);
const generateHash = (data) => crypto.createHash('sha256').update(data).digest('hex');

 
(async function() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    print('Fetching data...');
    const response = await fetch(url);
    const data = await response.json();
    
    print('Processing data...');
    await delay(2000);  
    const processedData = JSON.stringify(data, null, 2);
    
    print('Writing to file...');
    await fs.writeFile('data.json', processedData);
    
    print('Reading from file...');
    const fileData = await fs.readFile('data.json', 'utf-8');
    
    print('Generating hash...');
    const hash = generateHash(fileData);
    print('Data hash:', hash);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
