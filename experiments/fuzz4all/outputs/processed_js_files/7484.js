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
  
  async process() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      await task();
    }
    this.processing = false;
  }
  
  add(task) {
    this.queue.push(task);
    this.process();
  }
}

(async () => {
  const emitter = new EventEmitter();
  const asyncQueue = new AsyncQueue();
  
  emitter.on('task', async (task) => {
    asyncQueue.add(async () => {
      print(`Processing: ${task}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      print(`Finished: ${task}`);
    });
  });
  
  ['Task 1', 'Task 2', 'Task 3'].forEach(task => {
    emitter.emit('task', task);
  });

   
  await new Promise(resolve => setTimeout(resolve, 4000));
  print('All tasks completed.');
})();
