 
import { readFile } from 'fs/promises';

 
const targetObject = { message: "Hello, Proxy!" };

const handler = {
  get: (target, property, receiver) => {
    if (property === 'message') {
      return Reflect.get(target, property, receiver).toUpperCase();
    }
    return Reflect.get(target, property, receiver);
  }
};

const proxy = new Proxy(targetObject, handler);
print(proxy.message);  

 
async function processFiles(filePaths) {
  const promises = filePaths.map(filePath => readFile(filePath, 'utf8'));
  
  const results = await Promise.allSettled(promises);
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print(`File Content: ${result.value}`);
    } else {
      console.error(`Failed to read file: ${result.reason}`);
    }
  });
}

 
const filePaths = ['./file1.txt', './file2.txt'];
processFiles(filePaths);

 
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

const numbers = [1, 2, 3, 4, 5];
print(sum(...numbers));  

 
function displayUser({ name = 'Unknown', age = 'N/A' } = {}) {
  print(`Name: ${name}, Age: ${age}`);
}

const user = { name: 'Alice', age: 25 };
displayUser(user);  
displayUser();  

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, index) => acc + str + (values[index] || ''), '');
}

const name = 'Bob';
print(tag`Hello, ${name}!`);  

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value