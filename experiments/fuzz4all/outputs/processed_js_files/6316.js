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

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const promiseAllSettled = (promises) =>
  Promise.all(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );

const asyncProcess = async () => {
  const results = await promiseAllSettled([
    Promise.resolve("Resolved 1"),
    Promise.reject("Rejected 1"),
    Promise.resolve("Resolved 2"),
  ]);
  print(results);
};

const emitter = new EventEmitter();

emitter.on('data', debounce((msg) => print('Debounced:', msg), 300));
emitter.emit('data', 'Hello after debounce');
emitter.emit('data', 'Hello, this one will override the previous one');

setTimeout(() => {
  emitter.emit('data', 'Final call');
}, 500);

asyncProcess();
