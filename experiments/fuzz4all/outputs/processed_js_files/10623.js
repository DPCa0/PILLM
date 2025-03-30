class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  enqueue(promiseFunc) {
    this.queue.push(promiseFunc);
    this.runQueue();
  }

  async runQueue() {
    if (this.running) return;
    this.running = true;
    while (this.queue.length) {
      const currentFunc = this.queue.shift();
      try {
        await currentFunc();
      } catch (e) {
        console.error("Error in task: ", e);
      }
    }
    this.running = false;
  }
}

const queue = new AsyncQueue();

function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function randomTaskCreator(taskId) {
  return async function () {
    const duration = Math.floor(Math.random() * 2000);
    const result = await delay(duration, `Task ${taskId} completed in ${duration} ms`);
    print(result);
  };
}

for (let i = 1; i <= 10; i++) {
  queue.enqueue(randomTaskCreator(i));
}

 
async function* infiniteSequence(start = 0) {
  let i = start;
  while (true) {
    await delay(1000, null);  
    yield i++;
  }
}

(async () => {
  const sequence = infiniteSequence(1);
  for await (const num of sequence) {
    print(`Generated number: ${num}`);
    if (num >= 10) break;  
  }
})();
