 

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield new Promise(resolve => setTimeout(() => resolve(id++), 1000));
  }
}

 
async function fetchId(generator) {
  const nextIdPromise = generator.next().value;
  const id = await nextIdPromise;
  print(`Fetched ID: ${id}`);
  return id;
}

 
const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function(...args) {
        print(`Method called: ${property} with arguments: ${args}`);
        return target[property].apply(this, args);
      };
    }
    return target[property];
  }
};

class TaskManager {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  listTasks() {
    print('Current Tasks:', this.tasks);
  }
}

const proxyTaskManager = new Proxy(new TaskManager(), handler);

 
(async () => {
  const generator = idGenerator();

   
  for (let i = 0; i < 3; i++) {
    await fetchId(generator);
  }

   
  proxyTaskManager.addTask('Learn JavaScript');
  proxyTaskManager.addTask('Implement Proxies');
  proxyTaskManager.listTasks();
})();
