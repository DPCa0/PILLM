class AsyncProcessor {
  constructor(tasks) {
    this.tasks = tasks;
  }

  *taskGenerator() {
    for (let task of this.tasks) {
      yield task();
    }
  }

  async processTasks() {
    let iterator = this.taskGenerator();
    let taskResult = iterator.next();

    while (!taskResult.done) {
      try {
        let result = await taskResult.value;
        print('Task completed with result:', result);
      } catch (error) {
        console.error('Task failed:', error);
      }
      taskResult = iterator.next();
    }
  }
}

const tasks = [
  async () => await new Promise((resolve) => setTimeout(() => resolve('Task 1 Result'), 1000)),
  async () => await new Promise((resolve) => setTimeout(() => resolve('Task 2 Result'), 500)),
  async () => await new Promise((resolve, reject) => setTimeout(() => reject('Task 3 Failed'), 1500))
];

const processor = new AsyncProcessor(tasks);
processor.processTasks();

const enhancedMap = new Proxy(new Map(), {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Method '${prop}' called with arguments:`, args);
        return target[prop](...args);
      }
    }
    return target[prop];
  }
});

enhancedMap.set('key1', 'value1');
print(enhancedMap.get('key1'));
