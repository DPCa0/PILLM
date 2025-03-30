 
const asyncOperation = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data * 2);
    }, 1000);
  });
};

 
function* fibonacciGenerator(limit) {
  let a = 0, b = 1, index = 0;
  while (index++ < limit) {
    [a, b] = [b, a + b];
    yield a;
  }
}

 
const loggerHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({ name: "Alice", age: 25 }, loggerHandler);
user.name = "Bob";  

(async () => {
   
  const uniqueNumbers = [...new Set([1, 2, 3, 3, 2, 1])];
  print('Unique numbers:', uniqueNumbers);  

   
  const mapExample = new Map();
  mapExample.set('key1', 'value1').set('key2', 'value2');
  for (let [key, value] of mapExample) {
    print(`${key}: ${value}`);
  }

   
  const result = await asyncOperation(5);
  print('Async operation result:', result);  

   
  const fibGen = fibonacciGenerator(5);
  for (let value of fibGen) {
    print('Fibonacci:', value);  
  }

   
  const userProfile = { name: 'Alice', preferences: null };
  print('User theme:', userProfile.preferences?.theme ?? 'Default Theme');  
})();
