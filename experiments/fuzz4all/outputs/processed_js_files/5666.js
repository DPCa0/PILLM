 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache:', key);
      return cache.get(key);
    }
    print('Computing result for:', key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
class Example {
  #privateField = 'I am private';

  constructor(name) {
    this.name = name;
  }

  get #privateMethod() {
    return `${this.#privateField}, and only accessible inside the class.`;
  }

  publicMethod() {
    return `Hello, ${this.name}. ${this.#privateMethod}`;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'secret') return 'This is intercepted!';
    return target[prop];
  },
};

const example = new Example('JavaScript');
const proxyExample = new Proxy(example, handler);

print(proxyExample.publicMethod());
print(proxyExample.secret);

 
print(fibonacci(10));  
print(fibonacci(10));  

 
(async () => {
  try {
    const result = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
