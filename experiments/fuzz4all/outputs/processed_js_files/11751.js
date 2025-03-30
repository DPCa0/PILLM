const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

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

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const eventEmitter = new EventEmitter();

const logger = debounce((message) => {
  print(new Date(), message);
}, 500);

eventEmitter.on('log', logger);

const main = async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(apiURL);
  if (data) {
    eventEmitter.emit('log', `Fetched data: ${JSON.stringify(data)}`);
  }
};

main();
