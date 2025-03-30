const crypto = require('crypto');

 
const complexOperation = async () => {
   
  const fetchData = (resource) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resource) {
        resolve(`Data fetched from ${resource}`);
      } else {
        reject(new Error('Resource not found'));
      }
    }, 1000);
  });

   
  const { performance } = await import('perf_hooks');

   
  let data;
  try {
    data = await fetchData('https://example.com/api/data');
  } catch (error) {
    console.error(error);
  }

   
  const cache = new Map();
  cache.set('key1', 'value1');
  cache.set('key2', 'value2');

   
  const { key1, key2, ...rest } = Object.fromEntries(cache);
  print('Destructured keys:', key1, key2, rest);

   
  const handler = {
    get(target, property) {
      if (property === 'secret') {
        return crypto.createHash('sha256').update(target[property]).digest('hex');
      }
      return target[property];
    }
  };

  const targetObject = { secret: 'sensitive data', name: 'proxyObject' };
  const proxy = new Proxy(targetObject, handler);

   
  print('Data:', data);
  print('Performance Metrics:', performance.now());
  print('Cache:', cache);
  print('Proxy Access - Secret:', proxy.secret);
  print('Proxy Access - Name:', proxy.name);
};

 
complexOperation();
