class AsyncProcessor {
  constructor(tasks) {
    this.tasks = tasks;
  }

  async *processTasks() {
    for (const task of this.tasks) {
      yield await this.processTask(task);
    }
  }

  async processTask(task) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(`${task} processed`), Math.random() * 1000)
    );
  }
}

const tasks = ['Task1', 'Task2', 'Task3', 'Task4'];

(async () => {
  const processor = new AsyncProcessor(tasks);
  for await (const result of processor.processTasks()) {
    print(result);
  }
})();

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    }
    return `Property ${prop} doesn't exist`;
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const obj = new Proxy({}, proxyHandler);
obj.name = 'JavaScript';
print(obj.name);
print(obj.nonExistentProp);
