class AsyncHandler {
  constructor() {
    this.queue = [];
  }

  enqueue(fn) {
    this.queue.push(fn);
  }

  async execute() {
    for (const fn of this.queue) {
      await fn();
    }
  }
}

const asyncHandler = new AsyncHandler();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData() {
  await delay(1000);
  print('Fetched data');
}

async function processData() {
  await delay(500);
  print('Processed data');
}

async function saveData() {
  await delay(200);
  print('Saved data');
}

asyncHandler.enqueue(fetchData);
asyncHandler.enqueue(processData);
asyncHandler.enqueue(saveData);

(async function run() {
  print('Starting tasks...');
  await asyncHandler.execute();
  print('All tasks completed.');
})();
