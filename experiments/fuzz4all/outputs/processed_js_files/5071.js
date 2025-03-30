 
import fs from 'fs/promises';
import fetch from 'node-fetch';
import { performance } from 'perf_hooks';

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchDataAndSave = async (url, fileName) => {
  try {
     
    const startTime = performance.now();
    const response = await fetch(url);
    
    if (!response.ok) throw new Error(`Network response was not ok ${response.statusText}`);
    
    const data = await response.text();
    const endTime = performance.now();
    
    print(`Data fetched in ${(endTime - startTime).toFixed(2)}ms`);

     
    await fs.writeFile(fileName, data);
    print(`Data saved to ${fileName}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const targetObject = { msg: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => {
    print(`Accessed property: ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
  set: (obj, prop, value) => {
    print(`Set property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  await delay(1000);  
  await fetchDataAndSave('https://jsonplaceholder.typicode.com/posts', 'posts.txt');

  print(proxy.msg);  
  proxy.newProp = 'This is new';  
})();
