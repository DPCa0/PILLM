const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
  return await response.json();
};

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
    const listeners = this.events.get(event) || [];
    listeners.forEach(listener => listener(...args));
  }
}

const pipeline = (...fns) => x => fns.reduce((v, f) => f(v), x);

const formatData = data => data.map(item => ({
  title: item.title.toUpperCase(),
  id: item.id,
}));

const filterData = data => data.filter(item => item.id % 2 === 0);

const emitFormattedData = async (url, eventEmitter) => {
  try {
    const rawData = await fetchData(url);
    const processData = pipeline(formatData, filterData);
    const formattedData = processData(rawData);
    eventEmitter.emit('dataFormatted', formattedData);
  } catch (error) {
    console.error(error);
  }
};

const url = 'https://jsonplaceholder.typicode.com/todos';
const eventEmitter = new EventEmitter();

eventEmitter.on('dataFormatted', (data) => {
  print('Formatted Data:', data);
});

emitFormattedData(url, eventEmitter);
