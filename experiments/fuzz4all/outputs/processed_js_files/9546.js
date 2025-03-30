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

class TaskScheduler {
  constructor() {
    this.taskQueue = [];
    this.eventEmitter = new EventEmitter();
  }

  schedule(task) {
    this.taskQueue.push(task);
    this.eventEmitter.emit('taskScheduled', task);
    this.runNext();
  }

  async runNext() {
    if (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      await task();
      this.eventEmitter.emit('taskCompleted');
      this.runNext();
    }
  }
}

 
const scheduler = new TaskScheduler();

scheduler.eventEmitter.on('taskScheduled', task => {
  print(`Task scheduled: ${task.name}`);
});

scheduler.eventEmitter.on('taskCompleted', () => {
  print('Task completed!');
});

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

scheduler.schedule(async function task1() {
  await delay(1000);
  print('Executing Task 1');
});

scheduler.schedule(async function task2() {
  await delay(500);
  print('Executing Task 2');
});

scheduler.schedule(async function task3() {
  await delay(200);
  print('Executing Task 3');
});
