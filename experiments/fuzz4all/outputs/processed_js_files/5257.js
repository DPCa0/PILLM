 

class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache');
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const asyncFunction = async (param) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Async result: ${param}`), 1000);
  });
};

const promiseHandler = async () => {
  const result = await asyncFunction('Hello');
  print(result);
};

const observable = new Observable();
observable.subscribe(data => print(`Subscriber 1: ${data}`));
observable.subscribe(data => print(`Subscriber 2: ${data}`));

const memoizedFunction = memoize((num) => {
  print('Computing result');
  return num * num;
});

const handlerProxy = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}" with value "${target[prop]}"`);
      return target[prop];
    }
    console.warn(`Property "${prop}" does not exist`);
    return undefined;
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

const targetObj = { a: 1, b: 2 };
const proxy = new Proxy(targetObj, handlerProxy);

observable.notify('Event occurred');
print(memoizedFunction(5));
print(memoizedFunction(5));
promiseHandler();
proxy.c = 3;
print(proxy.a);
print(proxy.c);
print(proxy.d);
