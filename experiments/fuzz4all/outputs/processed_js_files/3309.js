const fs = require('fs').promises;

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);  
  const data = await fs.readFile('data.json', 'utf-8');
  return JSON.parse(data);
}

 
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

 
const target = {
  language: 'JavaScript',
  complexity: 'Advanced',
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed.`);
    return obj[prop];
  },
};

const proxy = new Proxy(target, handler);

 
(async () => {
   
  const data = (await fetchData())?.items ?? [];
  const double = createMultiplier(2);

   
  const result = data.map(item => ({
    ...item,
    valueDoubled: double(item.value),
  }));

   
  print(proxy.language);
  print(proxy.complexity);

  print('Processed Data:', result);
})();
