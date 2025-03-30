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
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(asyncFunc) {
    this.queue.push(asyncFunc);
    this.process();
  }

  async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    const asyncFunc = this.queue.shift();
    await asyncFunc();

    this.processing = false;
    this.process();
  }
}

const fetchData = (url) => new Promise(resolve => {
  setTimeout(() => {
    print(`Fetched data from ${url}`);
    resolve(`Data from ${url}`);
  }, 1000);
});

const emitter = new EventEmitter();
const queue = new AsyncQueue();

emitter.on('data', async (url) => {
  print(`Fetching: ${url}`);
  queue.enqueue(async () => {
    const data = await fetchData(url);
    print(`Received: ${data}`);
  });
});

['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'].forEach(url => {
  emitter.emit('data', url);
});
