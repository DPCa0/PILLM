class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }
  
  complete() {
    this.done = true;
  }
}

const taskHandler = {
  get(target, prop, receiver) {
    if (prop === 'status') {
      return target.done ? 'Completed' : 'Pending';
    }
    return Reflect.get(target, prop, receiver);
  }
};

const delayedExecution = async (task, delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  print(`Task "${task.title}" is now marked as done.`);
  task.complete();
};

const taskList = [
  new Task('Write Code'),
  new Task('Review PR'),
  new Task('Team Meeting')
].map(task => new Proxy(task, taskHandler));

(async () => {
  for (let task of taskList) {
    print(`Current task "${task.title}" is ${task.status}`);
    await delayedExecution(task, Math.random() * 2000);
    print(`Updated task "${task.title}" is ${task.status}`);
  }
})();
