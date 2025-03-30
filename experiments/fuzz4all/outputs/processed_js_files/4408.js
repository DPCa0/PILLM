 
import fetch from 'node-fetch';

 
const targetObject = { message: 'Hello, Proxy!' };
const handler = {
  get(target, prop, receiver) {
    print(`Getting property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};
const proxy = new Proxy(targetObject, handler);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}
const generateId = idGenerator();

 
const uniqueKey = Symbol('uniqueKey');
const exampleObject = {
  [uniqueKey]: 'Unique Value',
};

 
proxy.message = 'Hello, advanced JavaScript!';
print(proxy.message);

fetchData('https://jsonplaceholder.typicode.com/posts/1');

print('Generated ID:', generateId.next().value);
print('Generated ID:', generateId.next().value);

print('Unique Property:', exampleObject[uniqueKey]);
