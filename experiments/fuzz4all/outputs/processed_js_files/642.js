class Scheduler {
  #tasks = new Map();

  constructor() {
    this.#tasks = new Map();
  }

  async *executeTasks() {
    for (let [key, task] of this.#tasks) {
      yield await task();
    }
  }

  addTask(name, fn) {
    if (this.#tasks.has(name)) {
      console.error(`Task ${name} already exists.`);
      return;
    }
    this.#tasks.set(name, fn);
  }

  static debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
}

const complexComputation = (num) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(`Result of computation ${num}: ${num * num}`);
  }, 1000);
});

const scheduler = new Scheduler();
scheduler.addTask('compute1', () => complexComputation(5));
scheduler.addTask('compute2', () => complexComputation(10));
scheduler.addTask('compute3', () => complexComputation(15));

(async () => {
  for await (const result of scheduler.executeTasks()) {
    print(result);
  }
})();

 
const updateLayout = () => {
  print('Layout updated at', new Date().toLocaleTimeString());
};

const debouncedUpdateLayout = Scheduler.debounce(updateLayout, 2000);

window.addEventListener('resize', debouncedUpdateLayout);
