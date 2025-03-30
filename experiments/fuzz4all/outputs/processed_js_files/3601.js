 
import fetch from 'node-fetch';

 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
     
    const { userId, id, title, completed } = await response.json();

     
    print(logDetails`ID: ${id}, Title: "${title}"`);
     
    print(`User ${userId}'s task is${completed ? '' : ' not'} completed.`);

    // Higher order functions and functional programming
    [1, 2, 3, 4].filter(x => x % 2 === 0).forEach(x => print(`Even: ${x}`));

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Tagged template literals
function logDetails(strings, ...expressions) {
  return strings.reduce((acc, str, i) => `${acc}${str}${expressions[i] || ''}`, '');
}

// URL of the JSON data (replace with a valid one if needed)
const apiURL = 'https: 
fetchData(apiURL);

 
const handler = {
  get: (target, prop) => prop in target ? Reflect.get(target, prop) : 'Property not found',
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const proxy = new Proxy({ name: 'Proxy Example' }, handler);
print(proxy.name);
proxy.age = 30;
print(proxy.age);
print(proxy.nonExistentProperty);
