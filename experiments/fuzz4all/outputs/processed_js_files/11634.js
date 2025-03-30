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

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const dataEmitter = new EventEmitter();

dataEmitter.on('dataReceived', (data) => {
  print('Data received:', data);
});

dataEmitter.on('error', (error) => {
  console.error('Error:', error);
});

const handleSearch = debounce(async (query) => {
  try {
    const data = await fetchData(`https: 
    dataEmitter.emit('dataReceived', data);
  } catch (error) {
    dataEmitter.emit('error', error);
  }
}, 300);

 
['JavaScript', 'TypeScript', 'Python'].forEach((query, index) => {
  setTimeout(() => handleSearch(query), index * 500);
});
