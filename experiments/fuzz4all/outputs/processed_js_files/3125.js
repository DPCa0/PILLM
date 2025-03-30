 
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

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing property "${prop}"`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property "${prop}" to "${value}"`);
      obj[prop] = value;
      return true;
    },
  });
};

 
const complexObject = {
  name: 'Alice',
  details: {
    age: 30,
    interests: ['coding', 'chess', 'hiking'],
  },
};

const { name, details: { age, interests: [firstInterest, ...otherInterests] } } = complexObject;
print(name, age, firstInterest, otherInterests);

 
(async () => {
  const sequence = infiniteSequence();
  const firstFive = Array.from({ length: 5 }, () => sequence.next().value);
  print('First five numbers from generator:', firstFive);

  const factorial = memoize((n) => (n <= 1 ? 1 : n * factorial(n - 1)));
  print('Memoized factorial of 5:', factorial(5));

  const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched API data:', apiData);

  const