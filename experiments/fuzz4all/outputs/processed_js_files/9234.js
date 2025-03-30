 
async function* asyncGenerator(arr) {
  for (const item of arr) {
    yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
  }
}

(async () => {
   
  const { PI, random, pow } = Math;
  
   
  const array = [1, 2, 3, 4, 5];

   
  const doubled = [...array.map(n => n * 2)];

   
  const squaredAndFiltered = array.map(x => x ** 2).filter(x => x > 10);

   
  print(`Doubled: ${doubled}`);
  print(`Squared and filtered (> 10): ${squaredAndFiltered}`);

   
  const asyncIterable = asyncGenerator(['a', 'b', 'c']);
  const results = [];
  for await (const value of asyncIterable) {
    results.push(value);
  }
  print(`Async iteration results: ${results.join(', ')}`);
  
   
  const handler = {
    get: function(target, prop, receiver) {
      print(`Property accessed: ${prop}`);
      return Reflect.get(...arguments);
    }
  };
  
  const target = { foo: 'bar', baz: 'qux' };
  const proxy = new Proxy(target, handler);
  print(proxy.foo);  
  
   
  const uniqueKey = Symbol('unique');
  target[uniqueKey] = 'SecretValue';
  print(`Unique property: ${target[uniqueKey]}`);

   
  function* idGenerator() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }

  const idGenInstance = idGenerator();
  print(`Generated IDs: ${idGenInstance.next().value}, ${idGenInstance.next().value}`);

   
  const uniqueArray = [...new Set([1, 2, 2, 3, 4, 4, 5])];
  console.log