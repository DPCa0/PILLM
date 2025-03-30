 

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.resolveQueue = [];
  }

  async put(value) {
    if (this.resolveQueue.length > 0) {
      const resolve = this.resolveQueue.shift();
      resolve(value);
    } else {
      this.queue.push(value);
    }
  }

  async get() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    } else {
      return new Promise(resolve => {
        this.resolveQueue.push(resolve);
      });
    }
  }
}

function* fibonacciGenerator() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fibProxy = new Proxy(fibonacciGenerator(), {
  get(target, property) {
    if (property === 'next') {
      const result = target.next();
      print(`Generated Fibonacci number: ${result.value}`);
      return () => result;
    }
    return Reflect.get(target, property);
  }
});

const asyncQueue = new AsyncQueue();

(async function() {
  const fib = fibProxy;
  
   
  for (let i = 0; i < 10; i++) {
    asyncQueue.put(fib.next().value);
  }
})();

(async function() {
   
  for (let i = 0; i < 10; i++) {
    const value = await asyncQueue.get();
    print(`Consumed Fibonacci number: ${value}`);
  }
})();
