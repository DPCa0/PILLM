const { readFile } = require('fs').promises;
const { performance } = require('perf_hooks');

 
(async () => {
   
  const data = await readFile('./data.json', 'utf8');
  const jsonData = JSON.parse(data);

   
  const validator = {
    set(target, key, value) {
      if (typeof value !== 'number') {
        throw new Error('Value must be a number');
      }
      target[key] = value;
      return true;
    },
  };
  const numbers = new Proxy({}, validator);

   
  const promises = jsonData.numbers.map(async (num, index) => {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
    numbers[index] = num * num;
  });

  await Promise.all(promises);

   
  const results = Object.entries(numbers).map(
    ([key, value]) => `${key}: ${value ?? 'Calculation failed'}`
  );

   
  const start = performance.now();
  print(results);
  const end = performance.now();
  print(`Execution time: ${end - start} ms`);

   
  const privateData = new WeakMap();
  class SecureObject {
    constructor(secret) {
      privateData.set(this, secret);
    }
    getSecret() {
      return privateData.get(this);
    }
  }

  const secureInstance = new SecureObject('Hidden');
  print('Secret:', secureInstance.getSecret());
})();
