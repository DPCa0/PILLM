class Observable {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(event, fn) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(fn);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(fn => fn(data));
    }
  }
}

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const observable = new Observable();

const logData = debounce((data) => {
  print(`Received: ${data}`);
}, 1000);

observable.subscribe('data', logData);

(async () => {
  for (let i = 0; i < 5; i++) {
    observable.emit('data', `Hello, World! ${i}`);
    await new Promise(res => setTimeout(res, 500));  
  }
})();
