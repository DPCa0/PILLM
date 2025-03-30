class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const cache = new Proxy({}, {
  get: (target, prop) => (prop in target ? target[prop] : 'Data not found'),
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

const emitter = new EventEmitter();

function complexFunction(arr, callback) {
  return arr.flatMap(callback).reduce((acc, val) => acc + val, 0);
}

(async function main() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const data = await fetchData(url);
    cache.posts = data.slice(0, 5);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }

  emitter.on('calculate', result => print('Calculation result:', result));

  const numbers = [1, 2, 3, 4, 5];
  const result = complexFunction(numbers, x => [x * 2, x * 3]);
  emitter.emit('calculate', result);
})();
