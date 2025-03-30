class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    return response.json();
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

const cacheProxy = new Proxy({}, {
  get: (target, name) => name in target ? target[name] : null,
  set: (target, name, value) => {
    if (typeof value === 'string') {
      target[name] = value;
      return true;
    }
    throw new Error('Values must be strings');
  }
});

 
const events = new EventEmitter();
events.on('greet', name => print(`Hello, ${name}!`));

async function init() {
  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 3000);
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }

  cacheProxy['myKey'] = 'Some cached value';
  print('Cache:', cacheProxy['myKey']);

  events.emit('greet', 'World');
}

init();
