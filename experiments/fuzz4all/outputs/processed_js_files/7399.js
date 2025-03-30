 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
    throw error;
  }
}

 
const target = { message: 'Hello' };
const handler = {
  set(obj, prop, value) {
    print(`Property ${prop} changed to ${value}`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
const uniqueNumbers = new Set([1, 2, 3, 4]);
uniqueNumbers.add(4);  
uniqueNumbers.add(5);  

 
const uniqueKey = Symbol('uniqueKey');
proxy[uniqueKey] = 'This is a unique key';

 
(async function main() {
  proxy.message = 'Hello, Proxy!';
  print(`Unique numbers: ${[...uniqueNumbers].join(', ')}`);
  print(`Unique symbol property: ${proxy[uniqueKey]}`);

  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  try {
    const todo = await fetchData(url);
    print('Fetched TODO:', todo);
  } catch (error) {
    print('Error fetching data.');
  }
})();
