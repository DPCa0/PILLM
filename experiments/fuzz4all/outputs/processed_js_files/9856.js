 

 
const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 1; i <= 5; i++) {
       
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield i;
    }
  }
};

 
const handler = {
  get(target, prop, receiver) {
    if (prop === Symbol.asyncIterator) {
      print('Accessing async iterator');
    }
    return Reflect.get(...arguments);
  }
};

const proxy = new Proxy(asyncIterable, handler);

 
(async function processData() {
  iteratorLoop: for await (const num of proxy) {
    print(`Received number: ${num}`);
    if (num === 3) {
      print('Number 3 found, breaking loop using label');
      break iteratorLoop;
    }
  }
})();

 
(async () => {
  print('Starting IIFE for additional operations');
  const result = await Promise.resolve('Async operation complete');
  print(result);
})();
