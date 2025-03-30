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
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncDataFetcher = async url => {
  const response = await fetch(url);
  return response.json();
};

const enhancedAsyncFunction = async function* (urls) {
  for (const url of urls) {
    yield asyncDataFetcher(url).catch(e => ({ error: e.message }));
  }
};

const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
const eventEmitter = new EventEmitter();

eventEmitter.on('data', data => {
  if (data.error) {
    console.error('Error:', data.error);
  } else {
    print('Received data:', data);
  }
});

(async () => {
  const generator = enhancedAsyncFunction(urls);
  for await (const dataPromise of generator) {
    await delay(1000);   
    const data = await dataPromise;
    eventEmitter.emit('data', data);
  }
})();
