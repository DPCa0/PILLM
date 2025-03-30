class AsyncTaskManager {
  constructor() {
    this.queue = [];
  }

  addTask(task) {
    this.queue.push(task);
    return this;
  }

  runTasks() {
    return this.queue.reduce(
      (promiseChain, currentTask) => promiseChain.then(currentTask),
      Promise.resolve()
    );
  }
}

function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      print(`Data fetched from ${url}:`, data);
      return data;
    })
    .catch((error) => {
      console.error(`Error fetching data from ${url}:`, error);
    });
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

(async () => {
  const taskManager = new AsyncTaskManager();

  for (const url of urls) {
    taskManager.addTask(() => fetchData(url));
  }

  await taskManager.runTasks();
})();
