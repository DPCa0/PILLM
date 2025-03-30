 

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    return Reflect.set(target, property, value);
  }
};

const targetObject = {
  name: 'Advanced JS',
  year: 2023,
};

const proxyObject = new Proxy(targetObject, handler);

 
function* numberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetching Error:', error);
  }
}

 
function executeConcurrentTasks() {
  const promises = [
    fetchData('https://api.agify.io?name=michael'),
    fetchData('https://api.nationalize.io?name=michael'),
  ];

  Promise.all(promises)
    .then(() => console.log('All tasks completed'))
    .catch(err => console.error('An error occurred', err));
}

 
const advancedObject = {
  title: 'Complexity',
  version: 1.0,
  details: { author: 'Coder', length: 300 }
};

const clonedObject = Object.assign({}, advancedObject);
const frozenObject = Object.freeze({ ...advancedObject, version: 2.0 });

print('Frozen Object:', frozenObject);

 
const UNIQUE_KEY = Symbol('uniqueKey');
const objectWithSymbol = {
  [UNIQUE_KEY]: 'Symbol Value',
};

 
(function main() {
  proxyObject.name = 'JavaScript Mastery';  
  print(proxyObject.year);  
  
  const numbers = numberGenerator(5);
  print('Generated Numbers:', [...numbers]);