class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

(async function main() {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataFetched', data => {
    print('Data received:', data);
  });

  const debouncedFetch = debounce(async () => {
    try {
      const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
      eventEmitter.emit('dataFetched', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 500);

  print('Fetching data...');
  debouncedFetch();

  await delay(1000);
  print('Fetching data again...');
  debouncedFetch();
})();
