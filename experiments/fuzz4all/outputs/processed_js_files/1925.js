 

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

async function asyncDataFetcher(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

const eventEmitter = new EventEmitter();

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const fetchData = debounce(async (url) => {
  try {
    const data = await asyncDataFetcher(url);
    eventEmitter.emit('dataReceived', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }
}, 500);

eventEmitter.on('dataReceived', data => {
  print('Data:', data);
});

eventEmitter.on('error', error => {
  console.error('Error:', error);
});

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');
fetchData('https://jsonplaceholder.typicode.com/todos/2');
