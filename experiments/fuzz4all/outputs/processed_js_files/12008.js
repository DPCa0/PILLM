class EventEmitter {
  #listeners = new Map();

  on(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, []);
    }
    this.#listeners.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#listeners.has(event)) {
      this.#listeners.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listener) {
    if (this.#listeners.has(event)) {
      const listeners = this.#listeners.get(event);
      this.#listeners.set(event, listeners.filter(l => l !== listener));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

(async () => {
  const emitter = new EventEmitter();
  const url = 'https://api.example.com/data';

  emitter.on('dataFetched', (data) => {
    print('Data received:', data);
  });

  try {
    const data = await fetchData(url);
    emitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
