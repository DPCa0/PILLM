 
class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }

   
  describe() {
    return `${this.name} [Priority: ${this.priority}]`;
  }
}

 
const taskHandler = {
  get(target, prop, receiver) {
    if (prop === 'urgentTasks') {
      return target.filter(task => task.priority === 'high');
    }
    return Reflect.get(target, prop, receiver);
  },
  
  set(target, prop, value) {
    if (prop === 'length') {
      throw new Error('Cannot directly modify task list length');
    }
    target[prop] = value;
    return true;
  }
};

 
let tasks = [
  new Task('Complete project report', 'high'),
  new Task('Email client update', 'medium'),
  new Task('Buy groceries', 'low'),
  new Task('Schedule meeting', 'high')
];

 
tasks = new Proxy(tasks, taskHandler);

 
async function completeTask(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${task.describe()} has been completed.`);
    }, 1000);
  });
}

 
(async () => {
  print('Urgent Tasks: ', tasks.urgentTasks.map(task => task.describe()).join(', '));

  try {
    tasks.length = 2;  
  } catch (error) {
    console.error('Error:', error.message);
  }
  
  const completionMessages = await Promise.all(tasks.map(task => completeTask(task)));
  completionMessages.forEach(message => print(message));
})();
