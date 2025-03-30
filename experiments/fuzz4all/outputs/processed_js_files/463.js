class Scheduler {
  #tasks = new Set();
  #running = false;

  addTask(taskFunc) {
    const task = async () => {
      try {
        await taskFunc();
      } finally {
        this.#tasks.delete(task);
        this.#run();
      }
    };
    this.#tasks.add(task);
    this.#run();
  }

  #run() {
    if (!this.#running && this.#tasks.size > 0) {
      this.#running = true;
      Promise.all([...this.#tasks].map(t => t())).finally(() => {
        this.#running = false;
        if (this.#tasks.size > 0) this.#run();
      });
    }
  }
}

const fetchWithTimeout = (url, timeout) => {
  return Promise.race([
    fetch(url).then(res => res.json()),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
  ]);
};

const logTime = (label, fn) => {
  console.time(label);
  return fn().finally(() => console.timeEnd(label));
};

const scheduler = new Scheduler();
const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];

urls.forEach((url, index) => {
  scheduler.addTask(() => 
    logTime(`Fetch URL ${index + 1}`, () => fetchWithTimeout(url, 2000))
      .then(data => console.log(`Data ${index + 1}:`, data))
      .catch(err => console.error(`Error ${index + 1}:`, err))
  );
});
