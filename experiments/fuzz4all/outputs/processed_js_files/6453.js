(async () => {
   
  const functionsMap = new Map([
    ['add', (x, y) => x + y],
    ['subtract', (x, y) => x - y],
    ['multiply', (x, y) => x * y],
    ['divide', (x, y) => x / y],
  ]);

   
  const proxyHandler = {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return function(...args) {
          print(`Calling ${prop} with arguments: ${args}`);
          return Reflect.apply(target[prop], target, args);
        };
      }
      return Reflect.get(target, prop);
    }
  };

  const proxiedFunctions = new Proxy(Object.fromEntries(functionsMap), proxyHandler);

   
  function* operationGenerator() {
    yield ['add', 5, 3];
    yield ['subtract', 8, 2];
    yield ['multiply', 4, 7];
    yield ['divide', 20, 4];
  }

  const operations = operationGenerator();

   
  const executeOperations = async () => {
    for (let { value, done } = operations.next(); !done; value = operations.next()) {
      const [operation, a, b] = value;
      const result = proxiedFunctions[operation](a, b);
      print(`Result of ${operation}: ${result}`);
      await new Promise(resolve => setTimeout(resolve, 500));  
    }
  };

   
  await executeOperations();
})();
