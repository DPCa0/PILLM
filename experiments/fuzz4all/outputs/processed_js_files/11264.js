 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' has been accessed`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' has been set to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const data = { name: 'Alice', age: 30 };

 
const proxyData = new Proxy(data, handler);

 
(async () => {
  try {
    proxyData.name = 'Bob';
    print(proxyData.name);

     
    const _ = await import('https://cdn.skypack.dev/lodash');
    
     
    proxyData.name = _.capitalize(proxyData.name);
    print(proxyData.name);

     
    const jsonData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    print('Fetched Data:', jsonData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
