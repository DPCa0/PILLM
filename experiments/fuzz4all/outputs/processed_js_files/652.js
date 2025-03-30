 
const operate = (op) => (x) => (y) => op === 'add' ? x + y : op === 'multiply' ? x * y : 'Invalid operation';

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Called ${prop} with arguments: ${args}`);
        return Reflect.get(target, prop, receiver)(...args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const operations = new Proxy({
  add: operate('add'),
  multiply: operate('multiply')
}, handler);

 
async function* fetchNumbers() {
  const nums = [10, 20, 30];
  for (const num of nums) {
    await new Promise(r => setTimeout(r, 100));  
    yield num;
  }
}

 
(async () => {
  const numbers = fetchNumbers();
  const sum = operations.add;
  const product = operations.multiply;
  
  let totalSum = 0;
  let totalProduct = 1;
  
  for await (const number of numbers) {
    totalSum = sum(totalSum)(number);
    totalProduct = product(totalProduct)(number);
  }
  
  print(`Total Sum: ${totalSum}`);
  print(`Total Product: ${totalProduct}`);
})();
