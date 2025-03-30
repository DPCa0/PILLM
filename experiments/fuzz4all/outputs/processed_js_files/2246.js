class AsyncQueue {
  constructor() {
    this.tasks = [];
    this.working = false;
  }

  async enqueue(task) {
    this.tasks.push(task);
    if (!this.working) {
      this.working = true;
      while (this.tasks.length) {
        const currentTask = this.tasks.shift();
        try {
          await currentTask();
        } catch (error) {
          console.error(`Task error: ${error}`);
        }
      }
      this.working = false;
    }
  }
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  print('Fetched data:', data);
}

 
function* taskGenerator() {
  yield async () => {
    print('Task 1: Waiting 1 second...');
    await delay(1000);
    print('Task 1: Done!');
  };
  yield async () => {
    print('Task 2: Fetching data...');
    await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Task 2: Done!');
  };
}

 
async function run() {
  const queue = new AsyncQueue();
  const tasks = taskGenerator();

  for (const task of tasks) {
    queue.enqueue(task);
  }

   
  queue.enqueue(async () => {
    print('Inline Task: Waiting 500 ms...');
    await delay(500);
    print('Inline Task: Done!');
  });
}

 
run().catch(console.error);
