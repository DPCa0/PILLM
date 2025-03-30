class TaskScheduler {
  constructor() {
    this.queue = [];
    this.running = false;
  }

   
  addTask(task, priority = 0) {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
    if (!this.running) {
      this.runTasks();
    }
  }

   
  async runTasks() {
    this.running = true;
    while (this.queue.length > 0) {
      const { task } = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error('Task failed', error);
      }
    }
    this.running = false;
  }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const exampleTasks = [
  { task: async () => { print('Task 1 starting'); await delay(1000); print('Task 1 done'); }, priority: 1 },
  { task: async () => { print('Task 2 starting'); await delay(500); print('Task 2 done'); }, priority: 2 },
  { task: async () => { print('Task 3 starting'); await delay(700); print('Task 3 done'); }, priority: 1 },
];

 
const scheduler = new TaskScheduler();
exampleTasks.forEach(({ task, priority }) => scheduler.addTask(task, priority));

 
const handler = {
  get(target, prop) {
    if (prop === 'secret') {
      return 'You found the secret!';
    }
    return target[prop];
  },
};

const proxyExample = new Proxy({ hello: 'world', answer: 42 }, handler);
print(proxyExample.hello);
print(proxyExample.secret);

 
const privateProperty = Symbol('private');
const obj = {
  [privateProperty]: 'This is private',
  publicProperty: 'This is public',
};

print(obj.publicProperty);
print(obj[privateProperty]);
