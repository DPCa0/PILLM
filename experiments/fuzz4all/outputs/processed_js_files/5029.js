(async function complexFeatureDemo() {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Property '${prop}' accessed`);
      return Reflect.get(...arguments);
    },
    set(target, prop, value) {
      print(`Property '${prop}' set to '${value}'`);
      return Reflect.set(...arguments);
    }
  };

  const target = { message: 'Hello, world!' };
  const proxy = new Proxy(target, handler);
  
   
  print(proxy.message);
  proxy.message = 'Hello, Proxy!';
  print(proxy.message);
  
   
  function asyncOperation(msg, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(`Async: ${msg}`), delay));
  }
  
  async function performAsyncTasks() {
    const result1 = await asyncOperation('Task 1', 1000);
    print(result1);
    const result2 = await asyncOperation('Task 2', 500);
    print(result2);
  }

  await performAsyncTasks();

   
  const map = new Map();
  map.set('key1', 'value1');
  map.set('key2', 'value2');
  
  const set = new Set([1, 2, 3, 4, 5]);
  
  print('Map and Set contents:');
  for (const [key, value] of map) {
    print(`${key} => ${value}`);
  }
  
  for (const value of set) {
    print(value);
  }
  
   
  function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  const numbers = numberGenerator();
  for (const num of numbers) {
    print(`Generator output: ${num}`);
  }
})();
