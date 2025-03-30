 
class Counter {
  #count = 0;  

  constructor(initialValue = 0) {
    this.#count = initialValue;
  }

  increment() {
    return ++this.#count;
  }

  decrement() {
    return --this.#count;
  }

  getCount() {
    return this.#count;
  }
}

 
async function asyncCounterDemo(counter) {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  print('Starting Async Counter Demo...');
  await delay(1000);

   
  const { increment, decrement, getCount } = counter;

  print('Initial Count:', getCount());

  await delay(1000);
  print('Incremented:', increment());

  await delay(1000);
  print('Incremented Again:', increment());

  await delay(1000);
  print('Decremented:', decrement());

  print('Final Count:', getCount());
}

 
const counterProxyHandler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' accessed.`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Property '${prop}' set to ${value}.`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const counter = new Proxy(new Counter(10), counterProxyHandler);

 
asyncCounterDemo(counter);
