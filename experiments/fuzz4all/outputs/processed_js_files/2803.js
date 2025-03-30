class AsyncQueue {
  constructor() {
    this.queue = [];
    this.pendingPromise = false;
  }

  enqueue(item) {
    return new Promise((resolve) => {
      this.queue.push({ item, resolve });
      if (!this.pendingPromise) {
        this.dequeue();
      }
    });
  }

  async dequeue() {
    this.pendingPromise = true;
    while (this.queue.length > 0) {
      const { item, resolve } = this.queue.shift();
      const result = await item();
      resolve(result);
    }
    this.pendingPromise = false;
  }
}

const complexComputation = async (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

const main = async () => {
  const queue = new AsyncQueue();

  const items = [1, 2, 3, 4, 5].map((num) => {
    return async () => {
      print(`Computing square of ${num}`);
      const result = await complexComputation(num);
      print(`Result: ${result}`);
      return result;
    };
  });

  const results = await Promise.all(items.map(item => queue.enqueue(item)));
  print('All computations done:', results);
};

main();
