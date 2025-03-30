 
const EventEmitter = require('events');

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 1000);
  });
}

 
const target = {
  message: 'Hello, world!',
  greet() {
    return this.message;
  },
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return `Intercepted: ${obj[prop]}`;
    } else {
      return `Property ${prop} doesn't exist!`;
    }
  },
};

const proxy = new Proxy(target, handler);

// Class with generator function to yield Fibonacci sequence
class Fibonacci {
  *generate(limit) {
    let a = 0, b = 1;
    while (limit--) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

// Using an event-driven approach to synchronize data fetching
class DataHandler extends EventEmitter {
  async handleData() {
    print('Fetching data...');
    const data = await fetchData();
    print(data);
    this.emit('dataFetched');
  }
}

// Main execution
const dataHandler = new DataHandler();

dataHandler.on('dataFetched', () => {
  print(proxy.greet());
  print(proxy.nonExistent);

  const fib = new Fibonacci();
  print('Fibonacci sequence:');
  for (const num of fib.generate(5)) {
    print(num);
  }
});

 
dataHandler.handleData();
