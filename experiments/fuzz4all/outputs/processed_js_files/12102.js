class AsyncHandler {
  constructor() {
    this.queue = [];
    this.active = false;
  }

  async enqueue(fn) {
    this.queue.push(fn);
    if (!this.active) {
      this.active = true;
      await this.dequeue();
    }
  }

  async dequeue() {
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      await fn();
    }
    this.active = false;
  }
}

const handler = new AsyncHandler();

function advancedFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      print(`Fetched from: ${url}`);
      resolve(url);
    }, Math.random() * 2000);
  });
}

(async () => {
  const urls = ["https://api.example.com/1", "https://api.example.com/2", "https://api.example.com/3"];

  await Promise.all(urls.map(url => handler.enqueue(async () => {
    const result = await advancedFetch(url);
    print(`Processed: ${result}`);
  })));

  print("All tasks completed");
})();
