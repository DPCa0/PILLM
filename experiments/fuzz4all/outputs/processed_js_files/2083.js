 
import { createInterface } from 'readline';
import { readFile } from 'fs/promises';

 
async function readJsonFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
async function* asyncGenerator(iterable) {
  for (const item of iterable) {
    yield await Promise.resolve(item);
  }
}

 
const target = {};
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : `Property '${prop}' not found.`;
  },
};
const proxy = new Proxy(target, handler);

 
(async () => {
   
  proxy.name = 'JavaScript Enthusiast';
  print(proxy.name);  
  print(proxy.age);  

   
  const jsonData = await readJsonFile('./data.json');
  print(jsonData);

   
  const array = [1, 2, 3, 4];
  for await (const num of asyncGenerator(array)) {
    print(num);
  }

   
  const user = {
    info: {
      preferences: null,
    },
  };
  const theme = user.info.preferences?.theme ?? 'default theme';
  print(`Theme: ${theme}`);  

   
  const count = 5;
  print(`There are ${count} apples.`);

   
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(1000);
  print('Finished after delay');
})();
