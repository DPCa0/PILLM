const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
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
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const emitter = new EventEmitter();
emitter.on('dataReceived', (data) => print('Data received:', data));
emitter.on('error', (error) => console.error('Error received:', error));

(async () => {
  const processData = debounce(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    if (data) emitter.emit('dataReceived', data);
  }, 300);

  document.addEventListener('DOMContentLoaded', processData);
})();
