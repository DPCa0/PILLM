 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
  const data = await response.json();
  return data;
}

 
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} not found`),
  set: (obj, prop, value) => {
    if (typeof value === 'string') {
      obj[prop] = value.trim();
      return true;
    }
    throw new Error('Only strings are allowed');
  },
};

const targetObject = {};
const proxy = new Proxy(targetObject, handler);

 
const uniqueKey = Symbol('unique');
proxy[uniqueKey] = 'This is a unique value';

 
const uniqueValues = new Set([1, 2, 3, 4, 3, 2, 1]);  
const keyValuePairs = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

 
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
const greeting = `Hello, ${name}! You are ${age} years old.`;

 
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const dog = new Dog('Rex');

 
(async () => {
  print(greeting);
  print(dog.speak());
  print(`Generated ID: ${ids.next().value}`);
  print(`Proxy set and get operation: ${proxy.nonExistentProp}`);
  proxy.someProperty = ' Hello World ';
  console.log(`Trim