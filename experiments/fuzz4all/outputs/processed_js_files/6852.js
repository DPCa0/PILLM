class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }
  
  async enqueue(asyncFunction) {
    this.queue.push(asyncFunction);
    if (!this.pendingPromise) {
      this.pendingPromise = true;
      while (this.queue.length) {
        const currentFunction = this.queue.shift();
        try {
          await currentFunction();
        } catch (error) {
          console.error('Error executing async function:', error);
        }
      }
      this.pendingPromise = false;
    }
  }
}

 
const queue = new AsyncQueue();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const exampleTask = async (name, delayTime) => {
  print(`Task ${name} started.`);
  await delay(delayTime);
  print(`Task ${name} completed.`);
};

queue.enqueue(() => exampleTask('A', 1000));
queue.enqueue(() => exampleTask('B', 500));
queue.enqueue(() => exampleTask('C', 700));
