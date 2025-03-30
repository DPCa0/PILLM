class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) this.#events.set(event, []);
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listenerToRemove) {
    if (this.#events.has(event)) {
      this.#events.set(event, this.#events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function* generateNumbers(limit) {
  for (let i = 0; i < limit; i++) {
    yield i;
  }
}

async function processNumbers(url, limit) {
  try {
    const data = await fetchData(url);
    const numbers = generateNumbers(limit);
    for (let number of numbers) {
      print(`Processing number ${number} with data ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const emitter = new EventEmitter();

emitter.on('start', () => print('Starting the process...'));
emitter.on('end', () => print('Process ended.'));
emitter.emit('start');
processNumbers('https://jsonplaceholder.typicode.com/posts/1', 5).then(() => emitter.emit('end'));
