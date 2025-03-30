class TaskQueue {
  constructor(concurrency) {
    this.queue = [];
    this.concurrency = concurrency;
    this.current = 0;
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      setTimeout(() => this.dequeue(), 0);  
    });
  }

  dequeue() {
    if (this.current >= this.concurrency || this.queue.length === 0) {
      return;
    }
    const task = this.queue.shift();
    this.current++;
    task().finally(() => {
      this.current--;
      this.dequeue();
    });
  }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function performTask(id, ms) {
  print(`Task ${id} started`);
  await delay(ms);
  print(`Task ${id} completed`);
}

 
const queue = new TaskQueue(2);

[1000, 500, 300, 400, 200].forEach((time, index) => {
  queue.enqueue(() => performTask(index, time));
});
