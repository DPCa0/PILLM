class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  emit(event, ...args) {
    if (this.events.has(event)) this.events.get(event).forEach(listener => listener(...args));
  }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  const emitter = new EventEmitter();

  emitter.on('data', data => print('Data received:', data));
  emitter.on('error', err => console.error('Error:', err));

  try {
    const fetchData = async () => {
      await delay(1000);
      return Math.random() > 0.5 ? { value: 42 } : Promise.reject(new Error('Fetch failed'));
    };

    const processData = ({ value }) => value * 2;

    const data = await fetchData();
    emitter.emit('data', processData(data));
  } catch (err) {
    emitter.emit('error', err);
  }
})();
