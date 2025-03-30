 
const fs = require('fs').promises;

 
async function* readFiles(fileNames) {
  for (const fileName of fileNames) {
    yield fs.readFile(fileName, 'utf8');
  }
}

 
const handler = {
  get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} doesn't exist`),
};

const dynamicObject = new Proxy({ key1: 'value1' }, handler);

// Demonstrating Map and Set with destructuring
const myMap = new Map([
  ['a', 1],
  ['b', 2],
]);
const mySet = new Set([3, 4, 5]);

const [aValue, bValue] = myMap.values();
const [firstSetValue, ...restSetValues] = mySet;

print(`Map Values: ${aValue}, ${bValue}`);
print(`Set Values: ${firstSetValue}, ${restSetValues}`);

// Symbol and WeakMap example
const sym = Symbol('unique');
const weakmap = new WeakMap();
let obj = { key: 'val' };
weakmap.set(obj, 'Associated Value');

// Advanced Array methods and optional chaining
const data = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const foundItem = data.find(({ id }) => id === 2)?.name;
print(`Found Item: ${foundItem}`);

// Using readFiles generator with advanced error handling
(async () => {
  const fileNames = ['./file1.txt', './file2.txt'];
  try {
    for await (const content of readFiles(fileNames)) {
      print(content);
    }
  } catch (error) {
    console.error('Error reading files:', error);
  }
})();

 
print(dynamicObject.key1);  
print(dynamicObject.nonExistentKey);  
