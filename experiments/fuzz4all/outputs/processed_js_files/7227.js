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

function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  print(`Fetched data from ${url}:`, data);
}

(async () => {
  const eventEmitter = new EventEmitter();
  eventEmitter.on('dataFetched', (url) => print(`Data fetched event triggered for ${url}`));

  const fib = fibonacci();
  print('First 5 Fibonacci numbers:', Array.from({ length: 5 }, () => fib.next().value));

  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  await Promise.all(urls.map(async url => {
    await fetchData(url);
    eventEmitter.emit('dataFetched', url);
  }));
})();
