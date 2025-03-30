const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const processData = (data) => {
  const result = data.filter(item => item.isActive).map(item => ({
    name: item.name.toUpperCase(),
    details: `${item.age} years old, ${item.company}`
  }));
  print('Processed Data:', result);
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(url);

  const emitter = new EventEmitter();
  emitter.on('dataReceived', debounce(processData, 300));

  if (data) {
    emitter.emit('dataReceived', data);
  }
})();
