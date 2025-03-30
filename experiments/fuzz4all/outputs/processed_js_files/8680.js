 
const fs = require('fs').promises;

 
(async () => {
  try {
     
    const data = await fs.readFile('example.json', 'utf8');
    
     
    let { name, age } = JSON.parse(data);
    
     
    print(`Name: ${name}, Age: ${age ?? 'unknown'}`);

     
    const greet = (greeting, ...names) => {
      return names.map(name => `${greeting}, ${name}!`);
    };
    
     
    const namesArray = ['Alice', 'Bob', 'Charlie'];
    print(greet('Hello', ...namesArray).join(' '));
    
     
    const handler = {
      get: (obj, prop) => {
        print(`Accessing property: ${prop}`);
        return prop in obj ? obj[prop] : 'Property not found';
      }
    };

    const person = new Proxy({ name: 'Dave', age: 30 }, handler);
    print(person.name);
    print(person.location);
    
  } catch (error) {
     
    console.error('Error:', error?.message ?? 'An unknown error occurred');
  }
})();

 
(() => {
   
  const map = new Map();
  map.set('first', 'Hello');
  map.set('second', 'World');
  
  const set = new Set(['one', 'two', 'three']);
  
  print('Map keys and values:');
  for (const [key, value] of map) {
    print(`${key}: ${value}`);
  }

  print('Set values:');
  for (const value of set) {
    print(value);
  }
})();
