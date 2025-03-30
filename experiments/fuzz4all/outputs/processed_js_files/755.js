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

class PromisePool {
  constructor(maxConcurrency) {
    this.tasks = [];
    this.maxConcurrency = maxConcurrency;
    this.activeCount = 0;
  }

  add(promiseGenerator) {
    return new Promise((resolve, reject) => {
      this.tasks.push(() => promiseGenerator().then(resolve).catch(reject));
      this.next();
    });
  }

  next() {
    if (this.activeCount < this.maxConcurrency && this.tasks.length > 0) {
      const task = this.tasks.shift();
      this.activeCount++;
      task().finally(() => {
        this.activeCount--;
        this.next();
      });
    }
  }
}

 
const emitter = new EventEmitter();
emitter.on('message', (msg) => print(`Received: ${msg}`));

 
setTimeout(() => emitter.emit('message', 'Hello, Event Driven World!'), 1000);

 
const pool = new PromisePool(3);
const delay = (ms, result) => () => new Promise(resolve => setTimeout(() => resolve(result), ms));

const tasks = [
  delay(1000, 'Task 1'),
  delay(2000, 'Task 2'),
  delay(500, 'Task 3'),
  delay(1500, 'Task 4'),
  delay(800, 'Task 5')
];

tasks.forEach(task => pool.add(task).then(result => print(result)));
