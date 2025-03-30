class AsyncQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  async enqueue(task) {
    this.queue.push(task);
    if (!this.isProcessing) {
      await this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    while (this.queue.length) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (err) {
        console.error('Task error:', err);
      }
    }
    this.isProcessing = false;
  }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const queue = new AsyncQueue();

async function fetchData() {
  await delay(1000);
  print('Fetched data');
}

async function processData() {
  await delay(500);
  print('Processed data');
}

async function saveData() {
  await delay(700);
  print('Saved data');
}

async function executeWorkflow() {
  await queue.enqueue(async () => {
    await fetchData();
    await processData();
    await saveData();
  });

  await queue.enqueue(async () => {
    print('Executing additional task...');
    await delay(300);
    print('Additional task complete');
  });
}

executeWorkflow();
