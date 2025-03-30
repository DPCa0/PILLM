 
(async () => {
  const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js');

   
  const handler = {
    apply(target, thisArg, argumentsList) {
      print(`Called with args: ${argumentsList}`);
      return target(...argumentsList);
    }
  };

  const proxiedMap = new Proxy(_.map, handler);

   
  function* idGenerator() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }

  const idGen = idGenerator();

   
  const uniqueSymbol = Symbol('unique');

  class ComplexObject {
    constructor() {
      this[uniqueSymbol] = proxiedMap([1, 2, 3], (n) => n * 2);
    }

    async performComplexAction() {
       
      const results = await Promise.all(this[uniqueSymbol].map(async (num) => {
         
        const privateData = new WeakMap();
        privateData.set(this, { result: num * await idGen.next().value });
        return privateData.get(this).result;
      }));

       
      return formatter`Results: ${results}`;
    }
  }

   
  function formatter(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] ? JSON.stringify(values[i]) : ''), '');
  }

   
  const complexInstance = new ComplexObject();
  print(await complexInstance.performComplexAction());
})();
