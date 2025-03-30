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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

(async () => {
  try {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('dataReceived', data => {
      print('Data processed:', data.map(item => ({ ...item, processed: true })));
    });

    const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos');
    const filteredData = apiData.filter(item => item.completed);
    eventEmitter.emit('dataReceived', filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
