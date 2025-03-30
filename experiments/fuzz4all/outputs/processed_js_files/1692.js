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

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(
        event,
        this.events.get(event).filter(l => l !== listener)
      );
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

(async () => {
  const eventEmitter = new EventEmitter();

  const listener = (data) => {
    print('Received data:', data);
  };

  eventEmitter.on('data', listener);

  try {
    const data = await fetchData('https://api.publicapis.org/entries');
    eventEmitter.emit('data', data.entries);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    eventEmitter.off('data', listener);
  }
})();
