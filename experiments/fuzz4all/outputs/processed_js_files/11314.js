class AsyncQueue {
  #queue = [];
  #running = false;

  async #processQueue() {
    if (this.#running || this.#queue.length === 0) return;
    this.#running = true;
    while (this.#queue.length > 0) {
      const task = this.#queue.shift();
      await task();
    }
    this.#running = false;
  }

  addTask(task) {
    this.#queue.push(task);
    this.#processQueue();
  }
}

const queue = new AsyncQueue();

queue.addTask(async () => {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(res => res.json());
  print('Task 1:', data);
});

queue.addTask(async () => {
  const result = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos/2').then(res => res.json()),
    fetch('https://jsonplaceholder.typicode.com/todos/3').then(res => res.json())
  ]);
  print('Task 2:', result);
});

queue.addTask(() => new Promise(resolve => {
  setTimeout(() => {
    print('Task 3: Timeout finished');
    resolve();
  }, 1000);
}));

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} with value: ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedQueue = new Proxy(queue, handler);

proxiedQueue.addTask(async () => {
  print('Task 4: Proxied Task');
});
