class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  async emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      await listener(...args);
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

async function processAsyncTasks() {
  const emitter = new AsyncEventEmitter();
  
  emitter.on('data', async data => {
    print('Data received:', data);
     
    return new Promise(resolve => setTimeout(() => {
      print('Data processed:', data);
      resolve();
    }, 1000));
  });
  
  emitter.on('error', async error => {
    console.error('Error occurred:', error.message);
  });
  
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/invalid-url'
  ];
  
  for (const url of urls) {
    try {
      const data = await fetchData(url);
      await emitter.emit('data', data);
    } catch (error) {
      await emitter.emit('error', error);
    }
  }
}

processAsyncTasks();
