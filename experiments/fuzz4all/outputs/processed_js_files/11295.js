class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      this.next();
    });
  }

  next() {
    if (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      task().finally(() => {
        this.running--;
        this.next();
      });
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const queue = new TaskQueue(2);

  const taskGenerator = function* (count) {
    for (let i = 0; i < count; i++) {
      yield () => delay(1000).then(() => print(`Task ${i} done`));
    }
  };

  const tasks = taskGenerator(5);

  for (let task of tasks) {
    queue.enqueue(task);
  }
})();

const pipeline = [
  (str) => str.toUpperCase(),
  (str) => [...str].reverse().join(''),
  (str) => str.replace(/[^a-zA-Z]/g, ''),
];

const processString = (str, functions) =>
  functions.reduce((result, func) => func(result), str);

print(processString('Hello, World! 123', pipeline));  
