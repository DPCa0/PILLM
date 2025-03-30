 

const handler = {
  get: async function(target, prop, receiver) {
    if (typeof prop === 'symbol') return Reflect.get(target, prop, receiver);
    
    await new Promise(resolve => setTimeout(resolve, 100));  
    const value = target.get(prop);
    return value !== undefined ? value : 'Property does not exist';
  },
  set: function(target, prop, value, receiver) {
    if (typeof prop === 'symbol') return Reflect.set(target, prop, value, receiver);

    if (typeof value === 'string') {
      target.set(prop, value);
      return true;
    }
    console.error('Value must be a string!');
    return false;
  }
};

const asyncData = new Map();
const proxy = new Proxy(asyncData, handler);

(async () => {
  const key = Symbol('unique');  
  proxy[key] = 'Secret value';

  proxy.name = 'JavaScript';
  proxy.year = 2023;
  print(await proxy.name);  
  print(await proxy.year);  
  print(proxy[key]);  

  try {
    proxy.language = 123;  
  } catch (e) {
    console.error(e);
  }
})();
