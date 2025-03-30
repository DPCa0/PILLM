 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function processArray(arr, fn) {
  const results = [];
  for (const item of arr) {
    results.push(await fn(item));
  }
  return results;
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

const targetObj = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObj, handler);

(async () => {
  print('Original object:', targetObj);

   
  print('Proxy a:', proxy.a);
  proxy.b = 20;

   
  const numbers = [1, 2, 3];
  const result = await processArray(numbers, async num => {
    await delay(100);  
    return num * 2;
  });

  print('Processed array:', result);
})();
