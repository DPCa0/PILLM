(async () => {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  class AdvancedCollection {
    constructor() {
      this.data = new Map();
    }

    add(key, value) {
      this.data.set(key, value);
    }

    get(key) {
      return this.data.get(key);
    }
  }

  const collectionProxy = new Proxy(new AdvancedCollection(), {
    get(target, prop, receiver) {
      if (prop === 'get') {
        return async (...args) => {
          print('Fetching data...');
          await delay(500);  
          return Reflect.get(target, prop, receiver).apply(target, args);
        };
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      if (prop === 'add') {
        print(`Adding data: ${value}`);
      }
      return Reflect.set(target, prop, value, receiver);
    }
  });

  collectionProxy.add('example', { info: 'Some information' });
  const result = await collectionProxy.get('example');
  print('Result:', result);
})();
