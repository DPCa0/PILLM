(async () => {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   
  const handler = {
    get: (obj, prop) => {
      if (prop === 'hello') return 'world';
      return obj[prop];
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);

   
  function* generatorFunc() {
    yield 'Step 1';
    yield 'Step 2';
    yield 'Step 3';
    return 'Finished';
  }

  const gen = generatorFunc();

   
  const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
      for (let i = 0; i < 3; i++) {
        await delay(1000);
        yield `Async step ${i + 1}`;
      }
    }
  };

   
  async function executeComplexProcess() {
    const { value: step1 } = gen.next();
    print(step1);

    for await (const asyncStep of asyncIterable) {
      print(asyncStep);
    }

    const { value: finalStep } = gen.next();
    print(finalStep);

    print(`Proxy says: Hello, ${proxy.hello}!`);
  }

  executeComplexProcess();

   
  const dataFetch = Promise.resolve({ data: [1, 2, 3, 4] });
  const configFetch = Promise.resolve({ config: { retries: 3 } });

  Promise.all([dataFetch, configFetch])
    .then(([...results]) => {
      const [data, config] = results;
      print('Fetched Data:', data);
      print('Configuration:', config);
    });
})();
