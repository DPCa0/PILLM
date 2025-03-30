 
 

function* generateSequence() {
  yield 'Step 1';
  yield 'Step 2';
  yield 'Step 3';
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processSteps() {
  const steps = generateSequence();
  for (const step of steps) {
    await delay(1000);
    print(step);
  }
}

 
function log(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    print(`Calling ${key} with`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class Task {
  constructor(name) {
    this.name = name;
  }

  @log
  execute() {
    print(`Executing task: ${this.name}`);
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist`);
    }
  }
};

const task = new Task('Complex Task');
const proxiedTask = new Proxy(task, handler);

processSteps().then(() => {
  proxiedTask.execute();
});
