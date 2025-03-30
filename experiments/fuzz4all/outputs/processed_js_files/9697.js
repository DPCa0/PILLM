class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Executing: ${this.name}`);
    await new Promise(resolve => setTimeout(resolve, this.duration));
    print(`Completed: ${this.name}`);
  }
}

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 500),
  new Task('Task 3', 2000)
];

async function executeTasksConcurrently(tasks) {
  await Promise.all(tasks.map(task => task.execute()));
}

function* fibonacciGenerator(limit) {
  let a = 0, b = 1, sum;
  for (let i = 0; i < limit; i++) {
    yield a;
    sum = a + b;
    a = b;
    b = sum;
  }
}

async function runProgram() {
  print('Starting concurrent task execution');
  await executeTasksConcurrently(tasks);
  
  print('Fibonacci sequence:');
  const fibSeq = [...fibonacciGenerator(10)];
  print(fibSeq);

  print('Demonstrating Proxy and Reflect');
  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        return Reflect.get(obj, prop);
      } else {
        return 'Property does not exist';
      }
    }
  };

  const target = { foo: 'bar' };
  const proxy = new Proxy(target, handler);

  print(proxy.foo);  
  print(proxy.nonexistent);  
}

runProgram();
