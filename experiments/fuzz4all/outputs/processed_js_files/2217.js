class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    if (!this.processing) this.dequeue();
  }

  async dequeue() {
    this.processing = true;
    while (this.queue.length) {
      const promiseFunc = this.queue.shift();
      try {
        await promiseFunc();
      } catch (e) {
        console.error('Error processing promise:', e);
      }
    }
    this.processing = false;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  () => delay(1000).then(() => console.log('Task 1')),
  () => delay(500).then(() => console.log('Task 2')),
  () => delay(200).then(() => console.log('Task 3'))
];

const asyncQueue = new AsyncQueue();
tasks.forEach(task => asyncQueue.enqueue(task));

 
Promise.all([
  delay(300).then(() => console.log('Parallel Task A')),
  delay(100).then(() => console.log('Parallel Task B'))
]).then(() => print('All parallel tasks done'));
