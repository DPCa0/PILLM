 
async function complexTask(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.map((item) => item * 2));
    }, 1000);
  });
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get: (target, prop) => {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};
const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
   
  proxyObject.a = 10;
  print(proxyObject.a);

   
  const dataMap = new Map([
    ['name', 'Alice'],
    ['age', 30],
    ['location', 'Wonderland'],
  ]);

  const { name, ...rest } = Object.fromEntries(dataMap);
  print(`Name: ${name}`, `Rest:`, rest);

   
  const result = await complexTask([1, 2, 3, 4]);
  print('Complex task result:', result);

   
  const uniqueKey = Symbol('unique');
  proxyObject[uniqueKey] = 'Secret value';
  print('Unique property:', proxyObject[uniqueKey]);

   
  function* numberGenerator() {
    yield* [1, 2, 3];
    yield* [4, 5, 6];
  }
  const numbers = [...numberGenerator()];
  print('Generated numbers:', numbers);
})();
