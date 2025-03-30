 

 
function* fetchDataGenerator() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function consumeDataGenerator(generator) {
  for (let promise of generator) {
    const data = await promise;
    print(`Fetched: ${data}`);
  }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' accessed`);
    return target[prop];
  },
};
const proxy = new Proxy(targetObject, handler);

 
(async () => {
  print('Starting data fetch...');
  await consumeDataGenerator(fetchDataGenerator());

  print('Accessing proxy object properties:');
  print(proxy.a);
  print(proxy.b);
  print(proxy.c);
})();
