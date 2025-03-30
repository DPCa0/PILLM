class AsyncIterator {
  constructor(limit) {
    this.limit = limit;
    this.current = 0;
  }
  
  async *[Symbol.asyncIterator]() {
    while (this.current < this.limit) {
      yield new Promise((resolve) => setTimeout(() => resolve(this.current++), 1000));
    }
  }
}

const main = async () => {
  const iterator = new AsyncIterator(5);
  for await (const num of iterator) {
    print(`Number: ${num}`);
  }
  print('Iteration complete');
};

 
const logger = new Proxy(console, {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        target.log(`Logging: ${prop} called with`, ...args);
        return target[prop](...args);
      };
    }
    return target[prop];
  }
});

global.console = logger;

main();
