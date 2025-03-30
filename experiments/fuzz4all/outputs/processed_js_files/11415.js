class EventEmitter {
  #events = new Map();
  
  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, []);
    this.#events.get(event).push(listener);
    return this;
  }

  emit(event, ...args) {
    if (!this.#events.has(event)) return false;
    this.#events.get(event).forEach(listener => listener(...args));
    return true;
  }
}

const asyncOperation = (ms) => new Promise((resolve) => setTimeout(() => resolve(ms), ms));

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

(async function main() {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => print('Data received:', data));
  eventEmitter.on('done', () => print('All operations completed!'));

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
  ];
  
  const operations = [
    ...urls.map(url => fetchData(url).then(data => eventEmitter.emit('data', data))),
    asyncOperation(1000),
    asyncOperation(2000),
  ];

  await Promise.all(operations);
  eventEmitter.emit('done');
})();
