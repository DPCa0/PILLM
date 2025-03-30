 
class TaskQueue {
  constructor(concurrency) {
    this.queue = [];
    this.running = 0;
    this.concurrency = concurrency;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (err) {
          reject(err);
        } finally {
          this.running--;
          this.next();
        }
      });
      setTimeout(() => this.next(), 0);
    });
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      task();
    }
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const tasks = [
  () => delay(1000).then(() => console.log('Task 1 complete')),
  () => delay(500).then(() => console.log('Task 2 complete')),
  () => delay(200).then(() => console.log('Task 3 complete')),
  () => delay(300).then(() => console.log('Task 4 complete')),
  () => delay(400).then(() => console.log('Task 5 complete')),
];

(async () => {
  const queue = new TaskQueue(2);  
  await Promise.all(tasks.map(task => queue.enqueue(task)));
  print('All tasks completed');
})();

 
 
