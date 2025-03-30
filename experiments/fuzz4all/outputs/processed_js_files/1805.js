 
import fs from 'fs';
import { promisify } from 'util';
import fetch from 'node-fetch';

 
const readFile = promisify(fs.readFile);

async function complexFunctionality() {
  try {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) throw new Error('Network response was not ok');
    
    let data = await response.json();
    let { userId, title } = data;
    print(`User ${userId} needs to: ${title}`);

     
    const fileData = await readFile('./example.txt', 'utf-8');
    print(`File Contents:\n${fileData}`);

     
    const target = { message: 'This is a secret message' };
    const handler = {
      get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
      },
    };

    const proxy = new Proxy(target, handler);
    print(proxy.message);

     
    const arrayWithDuplicates = [1, 2, 3, 2, 4, 3];
    const uniqueArray = Array.from(new Set(arrayWithDuplicates));
    print(`Unique array: ${uniqueArray}`);

  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

complexFunctionality();
