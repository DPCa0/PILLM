class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
  }

  emit(event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
  }
}

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const memoize = (fn) => {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
};

const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('dataFetched', data => {
  print('Data received:', data);
});

 
const debouncedFetchData = debounce(async (url) => {
  const data = await fetchData(url);
  eventEmitter.emit('dataFetched', data);
}, 300);

(async () => {
  debouncedFetchData('https://jsonplaceholder.typicode.com/posts/1');

  print("Fibonacci of 10:", fibonacci(10));
  print("Fibonacci of 15:", fibonacci(15));
})();
