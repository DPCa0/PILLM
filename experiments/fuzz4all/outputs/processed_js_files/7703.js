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
  return response.json();
};

const processData = async (url) => {
  try {
    const data = await fetchData(url);
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const debounce = (func, delay) => {
  let debounceTimer;
  return (...args) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const throttledProcess = debounce(processData, 2000);

const eventEmitter = new EventEmitter();
eventEmitter.on('fetchData', throttledProcess);

['https://jsonplaceholder.typicode.com/todos/1', 
 'https://jsonplaceholder.typicode.com/todos/2'].forEach(url => {
  eventEmitter.emit('fetchData', url);
});
