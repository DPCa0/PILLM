 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

 
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
function* sequenceGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const createValidator = (target, validationFunc) => {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (!validationFunc(value)) {
        throw new TypeError(`Invalid value ${value} for property ${prop}`);
      }
      obj[prop] = value;
      return true;
    }
  });
};

 
const isPositiveNumber = (num) => typeof num === 'number' && num > 0;
const validatedObject = createValidator({}, isPositiveNumber);
validatedObject.someNumber = 42;  
 

 
(async () => {
  print("Fetching data...");
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print("Fetched Data: ", data);

  print("Fibonacci(10): ", fibonacci(10));

  print("Sequence from 1 to 5:");
  for (let num of sequenceGenerator(1, 5)) {
    print(num);
  }
})();
