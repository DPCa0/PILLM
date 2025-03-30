class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const eventEmitter = new EventEmitter();

eventEmitter.on('dataReceived', debounce(data => {
  print('Debounced Data:', data);
}, 300));

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    eventEmitter.emit('dataReceived', data);
    eventEmitter.emit('dataReceived', data);
    eventEmitter.emit('dataReceived', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
