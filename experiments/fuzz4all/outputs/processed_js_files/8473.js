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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const createProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      if (prop in obj) {
        print(`Getting ${prop}`);
        return obj[prop];
      }
      return `Property ${prop} does not exist`;
    },
    set(obj, prop, value) {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

const calculateFactorial = (n) => {
  return (n <= 1) ? 1 : n * calculateFactorial(n - 1);
};

const factorialMemo = new Proxy(calculateFactorial, {
  cache: new Map(),
  apply(target, thisArg, args) {
    const [n] = args;
    if (!this.cache.has(n)) {
      this.cache.set(n, target.apply(thisArg, args));
    }
    return this.cache.get(n);
  }
});

(async () => {
  const emitter = new EventEmitter();

  emitter.on('dataReceived', data => {
    print('Data received:', data);
  });

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    emitter.emit('dataReceived', data);

    const obj = { a: 1, b: 2 };
    const proxyObj = createProxy(obj);

    print(proxyObj.a);
    proxyObj.b = 3;
    print(proxyObj.b);

    print(`Factorial of 5: ${factorialMemo(5)}`);
    print(`Factorial of 5 (cached): ${factorialMemo(5)}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();
