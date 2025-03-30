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

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
}

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const events = new EventEmitter();

events.on('dataReceived', debounce(data => {
  print('Data processed:', data);
}, 500));

(async function() {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    events.emit('dataReceived', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
