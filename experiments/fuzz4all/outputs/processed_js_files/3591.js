 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property '${prop}' does not exist`);
      return undefined;
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'string') {
      print(`Setting property '${prop}' to '${value}'`);
      target[prop] = value.toUpperCase();
      return true;
    } else {
      console.error(`Invalid type for property '${prop}': Expected string`);
      return false;
    }
  },
};

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    const proxyData = new Proxy(data, dataHandler);

    print('Original Title:', proxyData.title);
    proxyData.title = 'new title';
    print('Transformed Title:', proxyData.title);

    proxyData.invalidProperty = 'test';  
    print('Attempted Access of Invalid Property:', proxyData.nonExistentProp);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
