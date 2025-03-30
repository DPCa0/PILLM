class EventEmitter {
  #events = new Map();

  on(event, listener) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.#events.has(event)) {
      this.#events.get(event).forEach(listener => listener(...args));
    }
  }

  removeListener(event, listenerToRemove) {
    if (this.#events.has(event)) {
      const filteredListeners = this.#events.get(event).filter(listener => listener !== listenerToRemove);
      this.#events.set(event, filteredListeners);
    }
  }
}

class TaskQueue {
  #queue = [];
  #concurrency;
  #running = 0;

  constructor(concurrency) {
    this.#concurrency = concurrency;
  }

  addTask(task) {
    this.#queue.push(task);
    this.runNext();
  }

  runNext() {
    if (this.#running < this.#concurrency && this.#queue.length > 0) {
      const task = this.#queue.shift();
      this.#running++;
      task().finally(() => {
        this.#running--;
        this.runNext();
      });
    }
  }
}

const queue = new TaskQueue(2);

queue.addTask(() => new Promise(resolve => {
  setTimeout(() => {
    print('Task 1');
    resolve();
  }, 1000);
}));

queue.addTask(() => new Promise(resolve => {
  setTimeout(() => {
    print('Task 2');
    resolve();
  }, 500);
}));

queue.addTask(() => new Promise(resolve => {
  setTimeout(() => {
    print('Task 3');
    resolve();
  }, 300);
}));

const emitter = new EventEmitter();

function responseListener(response) {
  print(`Response received: ${response}`);
}

emitter.on('response', responseListener);
emitter.emit('response', 'Success!');
emitter.removeListener('response', responseListener);
emitter.emit('response', 'This will not be logged.');
