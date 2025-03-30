 
(async () => {
   
  function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }

   
  const promiseMap = new Map(
    [...range(1, 6)].map(n => [
      n, 
      new Promise(resolve => setTimeout(() => resolve(n * n), n * 100))
    ])
  );

   
  const results = await Promise.all(
    Array.from(promiseMap.values())
  );

   
  const handler = {
    get: (target, prop) => {
      print(`Accessing property ${prop}`);
      return target[prop];
    }
  };

  const proxyResults = new Proxy(results, handler);

   
  function template(strings, ...expressions) {
    return strings.reduce(
      (acc, str, i) => `${acc}${str}<b>${expressions[i] || ''}</b>`,
      ''
    );
  }

   
  print(template`Squares: ${proxyResults.join(', ')}`);

   
  const config = {
    settings: {
      theme: null
    }
  };

  const theme = config.settings?.theme ?? 'default-theme';
  print(`Theme used: ${theme}`);

   
  class Counter {
    #count = 0;
    increment() {
      this.#count++;
    }
    get count() {
      return this.#count;
    }
  }

  const counter = new Counter();
  counter.increment();
  counter.increment();
  print(`Counter value: ${counter.count}`);
})();
