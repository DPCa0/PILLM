 
async function* fetchData(urls) {
  for (const url of urls) {
    yield fetch(url)
      .then(response => response.json())
      .catch(error => ({ error: `Error fetching ${url}: ${error}` }));
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

// Create a proxy around an empty object
const proxyObject = new Proxy({}, handler);

// Implement a memoization decorator
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
}

// Function to calculate factorial using recursion
const factorial = memoize(function(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
});

// Use WeakMap to store private data for a class
const privateData = new WeakMap();

class User {
  constructor(name, age) {
    const privateInfo = { age };
    privateData.set(this, privateInfo);
    this.name = name;
  }

  get age() {
    return privateData.get(this).age;
  }

  set age(newAge) {
    if (newAge > 0) {
      privateData.get(this).age = newAge;
    } else {
      console.error('Invalid age');
    }
  }
}

// Usage Example
(async () => {
  const user = new User('Alice', 30);
  print(user.name); // Alice
  print(user.age);  // 30
  user.age = 31;
  print(user.age);  // 31

  proxyObject.hello = 'world';    
  print(proxyObject.hello);  

  print(`Factorial of 5: ${factorial(5)}`);   
  console.log(`Factorial of 5: ${factorial(