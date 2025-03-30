class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }

  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(
        event,
        this.events.get(event).filter(listener => listener !== listenerToRemove)
      );
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

function* fibonacciSequence() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const events = new EventEmitter();
events.on('dataFetched', (data) => print('Data:', data));

(async () => {
  const fibGen = fibonacciSequence();
  print('Fibonacci:', fibGen.next().value);
  print('Fibonacci:', fibGen.next().value);
  print('Fibonacci:', fibGen.next().value);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    events.emit('dataFetched', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

const proxyHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist.`);
      return 42;  
    }
  }
};

const proxy = new Proxy({ existingProp: 'I exist!' }, proxyHandler);
print(proxy.existingProp);
print(proxy.nonExistentProp);
