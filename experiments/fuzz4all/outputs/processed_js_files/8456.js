 
(async () => {
  const fs = require('fs/promises');
  
   
  const data = await fs.readFile('./data.json', 'utf-8');
  const config = JSON.parse(data);

   
  const handler = {
    get: (target, prop, receiver) => {
      print(`Property "${prop}" accessed with value: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    },
  };

  const proxiedConfig = new Proxy(config, handler);

   
  const setting = proxiedConfig.settings?.option ?? 'defaultValue';

   
  const uniqueKey = Symbol('uniqueKey');
  proxiedConfig[uniqueKey] = 'SymbolicValue';

   
  function* range(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

   
  async function asyncIterateRange() {
    for await (const num of range(1, 5)) {
      print(`Number from range: ${num}`);
    }
  }

  await asyncIterateRange();

  print(`Setting accessed: ${setting}`);
  print(`Symbolic unique key value: ${proxiedConfig[uniqueKey]}`);
})();
