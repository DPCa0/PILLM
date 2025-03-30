 
(async () => {
  const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.default.js');

   
  const target = {
    name: 'Advanced JS',
    language: 'JavaScript',
  };

  const handler = {
    get: (obj, prop) => {
      print(`Property '${prop}' has been accessed.`);
      return obj[prop];
    },
  };

  const proxy = new Proxy(target, handler);

   
  print(proxy.name);  

   
  const numbers = [1, 2, 3];
  const numbersPlus = [...numbers, 4, 5];

  print(`Numbers with spread: ${numbersPlus}`);

   
  const obj = { details: { age: 30 } };
  const age = obj.details?.age ?? 'Not specified';
  print(`Age is: ${age}`);

   
  function* generatorExample() {
    yield 'First output';
    yield 'Second output';
    yield* anotherGenerator();
  }

  function* anotherGenerator() {
    yield 'Yielded from another generator';
  }

  const gen = generatorExample();

  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);

   
  const chunkedArray = _.chunk(['a', 'b', 'c', 'd'], 2);
  print('Chunked array:', chunkedArray);
})();
