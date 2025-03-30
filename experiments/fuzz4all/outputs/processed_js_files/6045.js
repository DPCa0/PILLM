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

  once(event, listener) {
    const oneTimeListener = (...args) => {
      listener(...args);
      this.off(event, oneTimeListener);
    };
    this.on(event, oneTimeListener);
  }

  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataFetched', data => {
    print('Data fetched:', data);
  });

  eventEmitter.once('error', error => {
    console.error('Error occurred:', error);
  });

  const debouncedFetch = debounce(async (url) => {
    try {
      const data = await fetchData(url);
      eventEmitter.emit('dataFetched', data);
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  }, 300);

  debouncedFetch('https://api.example.com/data');
  debouncedFetch('https://api.example.com/data');
  debouncedFetch('https://api.example.com/data');
})();
