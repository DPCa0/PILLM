class AsyncTaskRunner {
  constructor(tasks = []) {
    this.tasks = tasks;
  }

  async runAll() {
    const results = await Promise.allSettled(
      this.tasks.map(task => (typeof task === 'function' ? task() : Promise.resolve(task)))
    );
    results.forEach((result, idx) => {
      if (result.status === 'fulfilled') {
        print(`Task ${idx + 1} succeeded with result:`, result.value);
      } else {
        console.error(`Task ${idx + 1} failed with reason:`, result.reason);
      }
    });
  }
}

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
  return response.json();
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const tasks = [
  () => fetchData('https://jsonplaceholder.typicode.com/todos/1'),
  async () => {
    await wait(500);
    return 'Waited 500ms';
  },
  () => { throw new Error('This is an expected error'); },
];

const taskRunner = new AsyncTaskRunner(tasks);
taskRunner.runAll();
