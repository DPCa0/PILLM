class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, new Set());
    }
    this.#events.get(event).add(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }
  
  off(event, listener) {
    if (this.#events.has(event)) {
      this.#events.get(event).delete(listener);
    }
  }
}

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const apiCall = async (query) => {
  const response = await fetch(`https: 
  const data = await response.json();
  print(data);
};

const searchEventEmitter = new EventEmitter();
const debouncedAPICall = debounce(apiCall, 300);

searchEventEmitter.on('search', debouncedAPICall);

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchEventEmitter.emit('search', e.target.value);
});
