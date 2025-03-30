 
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
}

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);
  return response;
}

 
const emitter = new EventEmitter();

emitter.on('dataReceived', data => {
  print('Data received:', data);
});

(async () => {
  try {
    const response = await fetchWithTimeout('https://api.example.com/data', { timeout: 2000 });
    if (response.ok) {
      const data = await response.json();
      emitter.emit('dataReceived', data);
    } else {
      console.error('Network response was not ok:', response.statusText);
    }
  } catch (error) {
    console.error('Fetch operation failed:', error.message);
  }
})();
