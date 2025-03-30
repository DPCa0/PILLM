 

 
const calculateStats = (...numbers) => {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    sum,
    average: sum / numbers.length,
    max: Math.max(...numbers),
    min: Math.min(...numbers),
  };
};

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property '${prop}' does not exist`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to ${value}`);
    target[prop] = value;
    return true;
  },
};

const monitoredObj = new Proxy({ a: 1, b: 2 }, handler);

 
const uniqueSymbol = Symbol('unique');
monitoredObj[uniqueSymbol] = 'Special Value';

 
(function() {
  const stats = calculateStats(10, 20, 30, 40, 50);
  print('Stats:', stats);

  monitoredObj.a = 5;
  print(monitoredObj.a);

  fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => {
      if (data) {
        print('Fetched Data:', data);
      }
    });

  print('Unique Symbol Value:', monitoredObj[uniqueSymbol]);
})();
