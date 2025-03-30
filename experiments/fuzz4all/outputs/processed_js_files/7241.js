 

class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  execute() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        print(`Task ${this.name} completed`);
        resolve(`Result of ${this.name}`);
      }, this.duration);
    });
  }
}

async function executeTasks(tasks) {
  try {
    const results = await Promise.all(tasks.map(task => task.execute()));
    print('All tasks completed:', results);
  } catch (error) {
    console.error('Error executing tasks:', error);
  }
}

const tasks = [
  new Task('Task 1', 1000),
  new Task('Task 2', 500),
  new Task('Task 3', 1500)
];

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing ${prop} of task`);
    return Reflect.get(target, prop, receiver);
  }
};

 
const taskInstances = tasks.map(task => new Proxy(task, handler));

executeTasks([...taskInstances]);
