(async () => {
   
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve('Data fetched!'), 1000));

   
  const loggerProxy = new Proxy({ foo: 'bar' }, {
    get(target, prop) {
      print(`Property '${prop}' has been accessed.`);
      return Reflect.get(target, prop);
    }
  });

   
  function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (limit--) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }

   
  const data = await fetchData();
  print(data);

   
  print(loggerProxy.foo);

   
  const sequence = fibonacci(10);
  for (const num of sequence) {
    print(num);
  }

   
  const map = new Map(Object.entries({ a: 1, b: 2, c: 3 }));
  const doubledValues = new Set([...map.values()].map(x => x * 2));
  print('Doubled values in Set:', [...doubledValues]);

   
  class Calculator {
    static add(a, b) {
      return a + b;
    }
  }

  print('Sum from static method:', Calculator.add(5, 10));
})();
