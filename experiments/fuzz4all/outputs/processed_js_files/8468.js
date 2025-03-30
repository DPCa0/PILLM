class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    if (!this.running) {
      this.run();
    }
  }

  async run() {
    this.running = true;
    while (this.queue.length > 0) {
      const promiseFunc = this.queue.shift();
      try {
        const result = await promiseFunc();
        print('Result:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    this.running = false;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const advancedComputation = async (value) => {
  await delay(Math.random() * 1000);
  if (Math.random() > 0.7) {
    throw new Error('Random failure');
  }
  return value * 2;
};

const queue = new AsyncQueue();

for (let i = 1; i <= 5; i++) {
  queue.enqueue(() => advancedComputation(i));
}
