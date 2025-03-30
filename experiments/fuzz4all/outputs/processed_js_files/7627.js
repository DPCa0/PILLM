class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) this.events[event].forEach(listener => listener(...args));
  }
}

const asyncIterable = {
  [Symbol.asyncIterator]: async function* () {
    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield i;
    }
  }
};

async function processIterable() {
  for await (const num of asyncIterable) {
    print(`Async Iterated: ${num}`);
  }
}

function* generatorFunc() {
  yield 'First';
  yield 'Second';
  yield 'Third';
}

const myProxy = new Proxy(generatorFunc(), {
  get(target, prop, receiver) {
    if (prop === 'next') {
      const original = Reflect.get(target, prop, receiver);
      return function (...args) {
        const result = original.apply(target, args);
        if (!result.done) {
          print(`Proxy intercepted: ${result.value}`);
        }
        return result;
      };
    }
    return Reflect.get(target, prop, receiver);
  }
});

function sum(...nums) {
  return nums.reduce((acc, num) => acc + num, 0);
}

const handler = {
  apply(target, thisArg, argumentsList) {
    print(`Calculating sum of: ${argumentsList}`);
    return target(...argumentsList);
  }
};

const proxiedSum = new Proxy(sum, handler);

const eventEmitter = new EventEmitter();
eventEmitter.on('start', () => print('Event Start Triggered'));

async function main() {
  eventEmitter.emit('start');
  
  const gen = myProxy;
  gen.next();
  gen.next();
  gen.next();

  print(`Sum: ${proxiedSum(1, 2, 3, 4)}`);
  
  await processIterable();
}

main();
