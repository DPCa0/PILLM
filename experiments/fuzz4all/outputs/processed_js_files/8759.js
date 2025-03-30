(async () => {
   

   
  function* numberGenerator() {
    let i = 0;
    while (true) {
      yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
  }

   
  async function logNumbers(generator, count) {
    const iterator = generator();
    for (let i = 0; i < count; i++) {
      const promise = iterator.next().value;
      print(await promise);
    }
  }

   
  const loggerProxy = (target) => {
    return new Proxy(target, {
      get(obj, prop) {
        print(`Accessing property '${prop}'`);
        return obj[prop];
      },
      set(obj, prop, value) {
        print(`Setting property '${prop}' to ${value}`);
        obj[prop] = value;
        return true;
      }
    });
  };

   
  const reflectiveObject = {};
  Reflect.set(reflectiveObject, 'message', 'Hello, Reflect!');
  print(Reflect.get(reflectiveObject, 'message'));

   
  const logger = loggerProxy({ count: 5 });
  await logNumbers(numberGenerator, logger.count);
})();
