 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const createLoggerProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Property "${prop}" accessed.`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Property "${prop}" set to ${value}.`);
      obj[prop] = value;
      return true;
    }
  });
};

 
const uniqueKey = Symbol('unique');
const map = new Map();
map.set(uniqueKey, 'This is a value stored with a Symbol key');

 
const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);
const [first, ...rest] = [...uniqueNumbers];

 
(async () => {
  print('Fetching data...');
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched data:', data);

  const loggerObj = createLoggerProxy({ foo: 42 });
  print('Accessing foo:', loggerObj.foo);
  loggerObj.bar = 'new value';

  print('Symbol key value:', map.get(uniqueKey));

  print('Unique numbers:', first, rest);
})();
