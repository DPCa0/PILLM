class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve).catch(reject));
      this.dequeue();
    });
  }

  dequeue() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;
    const task = this.queue.shift();
    this.running++;
    task().finally(() => {
      this.running--;
      this.dequeue();
    });
  }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const tasks = [
  () => delay(1000).then(() => console.log('Task 1 completed')),
  () => delay(500).then(() => console.log('Task 2 completed')),
  () => delay(300).then(() => console.log('Task 3 completed')),
  () => delay(2000).then(() => console.log('Task 4 completed')),
  () => delay(1500).then(() => console.log('Task 5 completed')),
];

const queue = new TaskQueue(2);

tasks.forEach((task) => queue.enqueue(task));
