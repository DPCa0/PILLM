 

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property '${property}'`);
      return target[property];
    } else {
      return `Property '${property}' not found!`;
    }
  }
};

const data = new Proxy({ name: 'Advanced JS', version: 2023 }, handler);

 
const dataMap = new Map();
dataMap.set('name', data.name);
dataMap.set('version', data.version);

 
const featuresSet = new Set(['async/await', 'proxy', 'map', 'set', 'template literals']);

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...featuresSet]);
    }, 1000);
  });
};

 
const displayData = async () => {
  print(`Data Name: ${dataMap.get('name')}`);
  print(`Data Version: ${dataMap.get('version')}`);
  print('Fetching features...');

  const features = await fetchData();
  print(`Features: ${features.join(', ')}`);

   
  console.log(`\nUsing Advanced JavaScript Features:
  - Accessed data via Proxy
  - Stored data in Map and unique features in Set
  - Fetched async data with: ${features.join(', ')}`);
};

displayData();
