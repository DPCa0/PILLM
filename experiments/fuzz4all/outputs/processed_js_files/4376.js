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

const asyncFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('dataReceived', data => {
    print('Data received:', data);
  });

  emitter.on('error', err => {
    console.error('Error occurred:', err);
  });

  try {
    const data = await asyncFetch('https://jsonplaceholder.typicode.com/todos/1');
    emitter.emit('dataReceived', data);
  } catch (err) {
    emitter.emit('error', err);
  }
})();
