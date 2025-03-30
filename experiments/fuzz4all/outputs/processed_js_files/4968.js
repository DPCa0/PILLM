class Task {
  #title;
  #done = false;

  constructor(title) {
    this.#title = title;
  }

  toggleDone() {
    this.#done = !this.#done;
  }

  get info() {
    return `${this.#title} - ${this.#done ? 'Completed' : 'Pending'}`;
  }
}

const tasks = [
  new Task('Learn Promises'),
  new Task('Master ES6 Features'),
  new Task('Build a Complex Project')
];

 
const manageTasks = async () => {
  print('Task Manager Starting...');

  await new Promise(resolve => setTimeout(resolve, 1000));

  for (const task of tasks) {
    task.toggleDone();
    print(task.info);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  print('All tasks managed.');

   
  const completedTasks = [...tasks]
    .filter(({ info }) => info.includes('Completed'))
    .map(task => task.info);
  
  print('Completed Tasks:', completedTasks.join(', '));
};

manageTasks();

 
const taskHandler = {
  set(target, property, value) {
    if (property.startsWith('#')) {
      print(`Private property '${property}' cannot be directly set`);
    } else {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
    }
    return true;
  }
};

const taskProxy = new Proxy(tasks[0], taskHandler);
taskProxy.title = 'New Task Title';  
taskProxy.#done = true;  
