 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

 
const user = {
  name: 'Alice',
  age: 30,
};

const handler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : 'Property not found';
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxiedUser = new Proxy(user, handler);

 
const uniqueId = Symbol('id');

 
const numbers = [1, 2, 3, 4, 5];
const processedNumbers = numbers
  .map((x) => x * 2)
  .filter((x) => x > 5)
  .reduce((acc, x) => acc + x, 0);

print(`Fibonacci of 10: ${fibonacci(10)}`);
fetchData('https://jsonplaceholder.typicode.com/posts/1').then((data) =>
  console.log('Fetched Data:', data)
);
print(`Proxied User Name: ${proxiedUser.name}`);
proxiedUser.age = 31;
print(`Processed Numbers Result: ${processedNumbers}`);
print(`Unique Symbol: ${uniqueId.toString()}`);
