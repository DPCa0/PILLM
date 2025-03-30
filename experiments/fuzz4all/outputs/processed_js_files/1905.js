 
const fs = require('fs').promises;

 
async function readFileAsync(fileName) {
  try {
    const data = await fs.readFile(fileName, 'utf8');
    print('File content:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

 
(async () => {
  print('Starting file read...');
  await readFileAsync('example.txt');
  print('File read completed.');
})();

 
const targetObject = {
  message: "Hello, Proxy!"
};

const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return prop in obj ? obj[prop] : 'Property not found';
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.message);
proxyObject.newProp = 'New Value';
print(proxyObject.newProp);
print(proxyObject.nonExistentProp);

 
function* generatorFunction() {
  yield 'First value';
  yield 'Second value';
  yield 'Third value';
}

const gen = generatorFunction();

for (const value of gen) {
  print(value);
}
