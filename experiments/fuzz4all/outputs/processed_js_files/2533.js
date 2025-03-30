class AsyncEventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  
  on(event, listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(listener);
  }
  
  async emit(event, ...args) {
    if (this.listeners.has(event)) {
      const promises = this.listeners.get(event).map(listener => listener(...args));
      await Promise.all(promises);
    }
  }
}

const emitter = new AsyncEventEmitter();

function fetchData(url) {
  return fetch(url).then(response => response.json());
}

emitter.on('dataFetched', async (data) => {
  print('Data received:', data);
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Processed data:', data.map(item => item.title));
});

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const data = await fetchData(url);
    await emitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error:', error);
  }
})();
