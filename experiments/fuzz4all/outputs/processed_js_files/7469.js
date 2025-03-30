 

 
const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' is being set to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

const targetObject = { name: 'AdvancedJS', value: 42 };
const proxy = new Proxy(targetObject, handler);

 
async function fetchData() {
  print('Fetching data...');
  return new Promise(resolve => setTimeout(() => resolve('Fetched Data!'), 2000));
}

 
(async () => {
  proxy.name = 'JavaScript Proxy';
  print(proxy.name);

  try {
    const data = await fetchData();
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const sym = Symbol('unique');
  proxy[sym] = 'Symbolic Value';
  print(proxy[sym]);
})();
