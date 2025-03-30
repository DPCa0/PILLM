 
const Registry = (() => {
  const _registry = new Map();
  return {
    register(key, value) {
      const symKey = Symbol.for(key);
      _registry.set(symKey, value);
    },
    get(key) {
      return _registry.get(Symbol.for(key));
    }
  };
})();

 
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

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    throw new ReferenceError(`Property "${prop}" does not exist.`);
  }
};

 
const user = new Proxy({ name: "Alice", age: 30 }, handler);

 
function logUserInfo({ name, age, ...rest }) {
  print(`Name: ${name}, Age: ${age}, Others:`, rest);
}

 
function calculateSum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}

 
(async () => {
  Registry.register('apiData', await fetchData('https://jsonplaceholder.typicode.com/todos/1'));
  const apiData = Registry.get('apiData');
  print('Fetched API Data:', apiData);
  
  logUserInfo({ ...user, location: 'Wonderland' });
  
  print('Sum:', calculateSum(5, 10, 15, 20));
})();
