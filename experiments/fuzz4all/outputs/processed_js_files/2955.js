class AsyncPool {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.currentlyRunning = 0;
    this.taskQueue = [];
  }
  
  enqueueTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = async () => {
        this.currentlyRunning++;
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.currentlyRunning--;
          this.dequeueTask();
        }
      };
      this.taskQueue.push(taskWrapper);
      this.dequeueTask();
    });
  }
  
  dequeueTask() {
    if (this.currentlyRunning < this.concurrency && this.taskQueue.length) {
      const task = this.taskQueue.shift();
      task();
    }
  }
}

 
const delay = ms => new Promise(res => setTimeout(res, ms));

const pool = new AsyncPool(3);

const tasks = Array.from({ length: 10 }, (_, i) => async () => {
  await delay(1000);
  print(`Task ${i + 1} completed`);
});

tasks.forEach(task => pool.enqueueTask(task));
