class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }

  async execute() {
    print(`Starting task: ${this.name}`);
    await new Promise(resolve => setTimeout(resolve, this.duration));
    print(`Completed task: ${this.name}`);
  }
}

const scheduler = {
  tasks: [],
  addTask(name, duration) {
    const task = new Task(name, duration);
    this.tasks.push(task);
    return this;   
  },
  async runTasks() {
    for (const task of this.tasks) {
      await task.execute();
    }
  }
};

 
const userPreferences = {
  theme: 'dark',
  tasks: {
    favorite: 'learn JavaScript'
  }
};

const preferencesHandler = {
  get(target, prop) {
    return prop in target ? target[prop] : `No ${prop} set`;
  }
};

const preferencesProxy = new Proxy(userPreferences, preferencesHandler);

print(`Favorite task: ${preferencesProxy.tasks?.favorite ?? 'No favorite task'}`);
print(`Preferred language: ${preferencesProxy.language ?? 'JavaScript'}`);

scheduler
  .addTask('Task 1', 2000)
  .addTask('Task 2', 1000)
  .addTask('Task 3', 1500)
  .runTasks();
