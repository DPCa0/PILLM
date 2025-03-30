const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event))
      this.events.get(event).forEach((listener) => listener(...args));
  }
}

const applyDecorator = (func, decorator) => (...args) => {
  print("Before execution");
  const result = decorator(func)(...args);
  print("After execution");
  return result;
};

const sum = (a, b) => a + b;
const logDecorator = (func) => (...args) => {
  print(`Arguments: ${args}`);
  return func(...args);
};

const decoratedSum = applyDecorator(sum, logDecorator);

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(url);
  
  const emitter = new EventEmitter();
  emitter.on('dataFetched', data => print("Data received:", data));

  if (data) {
    emitter.emit('dataFetched', data);
  }

  print("Decorated sum result:", decoratedSum(5, 10));
})();
