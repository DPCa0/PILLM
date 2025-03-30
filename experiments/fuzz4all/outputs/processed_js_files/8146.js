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

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) this.processQueue();
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }
    this.isProcessing = false;
  }
}

const asyncQueue = new AsyncQueue();
const emitter = new EventEmitter();

async function fetchData() {
  await new Promise(resolve => setTimeout(resolve, 1000));  
  return { data: 'Hello, async world!' };
}

async function mainTask() {
  const data = await fetchData();
  emitter.emit('dataReceived', data);
}

emitter.on('dataReceived', ({ data }) => {
  print(data);
});

asyncQueue.enqueue(mainTask);
asyncQueue.enqueue(() => print('Another task in the queue'));
