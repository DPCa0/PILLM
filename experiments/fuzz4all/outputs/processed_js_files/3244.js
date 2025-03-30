 
"use strict";

 
const handler = {
  get: function(target, property, receiver) {
    print(`Property '${property.toString()}' has been accessed`);
    return Reflect.get(...arguments);
  }
};

const originalObject = { greeting: 'Hello, world!', language: 'JavaScript' };
const proxyObject = new Proxy(originalObject, handler);

 
const numbers = [1, 2, 3, 4, 5];
const [first, ...rest] = numbers;

 
const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5, 5]);

 
class Greeter {
  #greeting;
  
  constructor(greeting) {
    this.#greeting = greeting;
  }
  
  greet() {
    print(this.#greeting);
  }
}

const greeter = new Greeter(proxyObject.greeting);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

greeter.greet();

 
(async function() {
  const apiData = await fetchData('https://api.example.com/data');
  print('API Data:', apiData);

   
  const deduplicatedArray = [...uniqueNumbers];
  print('Deduplicated Array:', deduplicatedArray);
})();
