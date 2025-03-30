 
(async function complexExample() {
   
  const randomDelay = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), Math.random() * 1000));

   
  async function* asyncGenerator() {
    const values = [randomDelay(), randomDelay(), randomDelay()];
    for await (const value of values) {
      yield value;
    }
  }

   
  const config = {
    [Symbol('dynamic')]: async () => (await import('https://unpkg.com/lodash-es')).default,
    get random() {
      return Math.random();
    }
  };

  const handler = {
    get: (target, prop, receiver) => {
      if (prop === 'random') return `Overridden: ${Reflect.get(...arguments)}`;
      return Reflect.get(...arguments);
    }
  };

   
  const proxiedConfig = new Proxy(config, handler);

   
  const results = new Map();
  for await (const value of asyncGenerator()) {
    const { random } = proxiedConfig;
    results.set(value, random);
  }

   
  for (const [key, value] of results.entries()) {
    print(`Promise resolved with: ${key.toFixed(2)}, Random: ${value}`);
  }

   
  const { default: lodash } = await config[Object.getOwnPropertySymbols(config)[0]]() ?? {};
  print(lodash ? lodash.chunk(['a', 'b', 'c', 'd'], 2) : 'Lodash failed to load');
})();
