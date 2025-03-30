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

async function fetchJson(url) {
  let response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  let data = await response.json();
  return data;
}

function* fibonacciSequence(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('dataFetched', data => {
    print('Data received:', data);
  });

  try {
    const data = await fetchJson('https://jsonplaceholder.typicode.com/posts/1');
    eventEmitter.emit('dataFetched', data);

    print('Fibonacci Sequence:');
    for (let number of fibonacciSequence(10)) {
      print(number);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
