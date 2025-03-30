 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
const target = {
  message: 'Hello, Proxy!'
};

const handler = {
  get: (obj, prop) => {
    print(`Property "${prop}" accessed with value:`, obj[prop]);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Property "${prop}" set to value:`, value);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
class Person {
  constructor(name) {
    this.name = name;
  }
}

const person = new Person('Alice');
Reflect.set(person, 'age', 30);
print('Person:', Reflect.get(person, 'name'), 'Age:', Reflect.get(person, 'age'));

 
function* generateSequence() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const sequence = generateSequence();
print(sequence.next().value);  
print(sequence.next().value);  

 
const myMap = new Map([
  ['name', 'John'],
  ['age', 25]
]);

const mySet = new Set([1, 2, 3, 4, 5]);

 
const { name, age } = myMap;
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5, 6];

function sum(...args) {
  return args.reduce((acc, curr) => acc + curr, 0);
}

print('Sum:', sum(...moreNumbers));

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const result = await fetchData(url);
  print('Fetched Data:', result);