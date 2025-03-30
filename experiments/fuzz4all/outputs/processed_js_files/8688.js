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

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(l => l !== listener));
    }
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching ${url}`);
  return response.json();
}

function* idGenerator() {
  let id = 0;
  while (true) yield id++;
}

const userIdGen = idGenerator();

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const emitter = new EventEmitter();
emitter.on('dataFetched', debounce((data) => {
  print('Data fetched:', data);
}, 300));

(async () => {
  try {
    const userId = userIdGen.next().value;
    print(`Fetching data for user id: ${userId}`);
    const data = await fetchJson('https://jsonplaceholder.typicode.com/users');
    emitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error:', error);
  }
})();
