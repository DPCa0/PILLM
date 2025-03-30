class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }
  
  runTask(task) {
    if (this.running >= this.concurrency) {
      this.queue.push(task);
    } else {
      this.running++;
      task().then(() => {
        this.running--;
        if (this.queue.length > 0) {
          const nextTask = this.queue.shift();
          this.runTask(nextTask);
        } else if (this.running === 0) {
          this.emit('drain');
        }
      });
    }
  }

  addTask(task) {
    this.runTask(task);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const tasks = Array.from({ length: 10 }, (_, i) => () => delay(1000).then(() => print(`Task ${i + 1} done`)));

const queue = new TaskQueue(3);

tasks.forEach(task => queue.addTask(task));

queue.on('drain', () => print('All tasks completed.'));
