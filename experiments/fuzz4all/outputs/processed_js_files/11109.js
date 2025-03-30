class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      this.isProcessing = true;
      while (this.queue.length) {
        const currentTask = this.queue.shift();
        await currentTask();
      }
      this.isProcessing = false;
    }
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexCalculation(input) {
  const result = await Promise.allSettled([
    delay(100).then(() => input + 10),
    delay(200).then(() => input * 2),
    delay(300).then(() => input / 3),
  ]);

  return result.reduce((acc, curr) => {
    if (curr.status === 'fulfilled') {
      return acc + curr.value;
    }
    return acc;
  }, 0);
}

(async () => {
  const queue = new AsyncQueue();

  for (let i = 1; i <= 5; i++) {
    queue.enqueue(async () => {
      const result = await complexCalculation(i);
      print(`Result for ${i}:`, result);
    });
  }
})();
