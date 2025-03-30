 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property ${prop} does not exist.`);
    }
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    if (typeof value === 'string') {
      return Reflect.set(target, prop, value);
    } else {
      throw new TypeError('Value must be a string');
    }
  }
};

const targetObject = {
  name: 'Alice',
  greet() {
    print(`Hello, my name is ${this.name}`);
  }
};

const proxy = new Proxy(targetObject, handler);

 
try {
  proxy.greet();
  proxy.name = 'Bob';  
  print(proxy.name);
  
  proxy.age = 30;  
} catch (e) {
  console.error(e.message);
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
const uniqueKey = Symbol('unique');
targetObject[uniqueKey] = 'Secret Data';

 
Reflect.ownKeys(targetObject).forEach(key => {
  print(`Key: ${String(key)}, Value: ${targetObject[key]}`);
});

 
function tag(strings, ...expressions) {
  return strings.reduce((acc, str, index) => `${acc}${str}${expressions[index] || ''}`, '');
}

const user = { name: 'Charlie', age: 25 };
print(tag`User ${user.name} is ${user.age} years old.`);

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;