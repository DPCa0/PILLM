class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  async process() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error('Error executing task:', error);
      }
    }
    
    this.running = false;
  }

  addTask(task) {
    if (typeof task !== 'function') throw new Error('Task must be a function');
    this.queue.push(task);
    this.process();
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const queue = new AsyncQueue();

queue.addTask(async () => {
  print('Task 1: Fetching data');
  await delay(1000);
  print('Task 1: Data fetched');
});

queue.addTask(async () => {
  print('Task 2: Processing data');
  await delay(1500);
  print('Task 2: Data processed');
});

queue.addTask(async () => {
  print('Task 3: Saving data');
  await delay(500);
  print('Task 3: Data saved');
});

 
setTimeout(() => {
  queue.addTask(async () => {
    print('Task 4: Finalizing');
    await delay(700);
    print('Task 4: Done');
  });
}, 2000);
