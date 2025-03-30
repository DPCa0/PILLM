const fetchData = async (url) => {
   
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const debounce = (func, delay) => {
   
  let timerId;
  return function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const generateID = () => {
   
  let id = 0;
  return function* () {
    while (true) {
      yield ++id;
    }
  };
};

const idGenerator = generateID();

const complexMapOperation = () => {
   
  const map = new Map();
  map.set('a', 1).set('b', 2).set('c', 3);

  const sum = [...map.values()].reduce((acc, value) => acc + value, 0);
  print(`Sum of map values: ${sum}`);

  const updatedMap = new Map([...map.entries()].map(([key, value]) => [key, value * 2]));
  print('Updated map:', Object.fromEntries(updatedMap));
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist`);
      return null;
    }
  },
};

const data = { name: 'Alice', age: 25 };
const proxiedData = new Proxy(data, handler);

(async () => {
  await fetchData('https://jsonplaceholder.typicode.com/posts');
  print(`Generated ID: ${idGenerator().next().value}`);
  print(proxiedData.name);  
  print(proxiedData.height);  
  complexMapOperation();
})();

const debouncedLog = debounce(console.log, 1000);
debouncedLog('This will be logged after 1 second delay');
debouncedLog('This should replace the previous call if it executes before 1 second