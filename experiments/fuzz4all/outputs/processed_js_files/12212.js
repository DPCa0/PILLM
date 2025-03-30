class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    (this.events[event] || (this.events[event] = [])).push(listener);
  }
  emit(event, ...args) {
    (this.events[event] || []).forEach(listener => listener(...args));
  }
}

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(id);
  return response.json();
}

(async () => {
  const emitter = new EventEmitter();
  const debouncedEmit = debounce((msg) => emitter.emit('message', msg), 300);

  emitter.on('message', message => print(`Event received: ${message}`));

  const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched data:', data);

  debouncedEmit('Hello,');
  debouncedEmit('world!');
  setTimeout(() => debouncedEmit('Delayed message'), 400);
})();
