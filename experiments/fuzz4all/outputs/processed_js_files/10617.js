class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const emitter = new EventEmitter();

function asyncTask(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      print(`Task ${id} completed`);
      resolve(id);
    }, Math.random() * 2000);
  });
}

async function runTasks(tasks) {
  const results = [];
  for (let task of tasks) {
    results.push(await task);
  }
  return results;
}

function* taskGenerator() {
  yield asyncTask(1);
  yield asyncTask(2);
  yield asyncTask(3);
}

async function main() {
  emitter.on('done', results => print('All tasks done:', results));
  
  const tasks = [...taskGenerator()];
  const results = await runTasks(tasks);

  emitter.emit('done', results);
}

main().catch(console.error);
