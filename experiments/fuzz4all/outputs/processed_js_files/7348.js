class AsyncPool {
  constructor(tasks, concurrency) {
    this.tasks = tasks;
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
    this.results = [];
  }

  runTask(task, index) {
    this.running++;
    task().then(result => {
      this.results[index] = result;
      this.running--;
      this.next();
    });
  }

  next() {
    if (this.results.length === this.tasks.length) {
      return Promise.resolve(this.results);
    }

    while (this.running < this.concurrency && this.tasks.length > 0) {
      const index = this.results.length;
      const task = this.tasks.shift();
      this.runTask(task, index);
    }
  }

  start() {
    return new Promise(resolve => {
      this.next();
      const interval = setInterval(() => {
        if (this.results.length === this.tasks.length) {
          clearInterval(interval);
          resolve(this.results);
        }
      }, 10);
    });
  }
}

const tasks = Array.from({ length: 10 }, (_, i) => () =>
  new Promise(res => setTimeout(() => res(`Task ${i} complete`), Math.random() * 1000))
);

const pool = new AsyncPool(tasks, 3);

pool.start().then(results => print(results));

 
const logger = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Set property: ${property} = ${value}`);
    return Reflect.set(target, property, value);
  }
};

const obj = new Proxy({ a: 1, b: 2 }, logger);

print(obj.a);
obj.b = 3;
print(obj.b);

 
const uniqueId = Symbol('id');

const user = {
  name: 'John',
  [uniqueId]: 123
};

print(`User ID: ${user[uniqueId]}`);
