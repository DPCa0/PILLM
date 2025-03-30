class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

const tasks = [
  new Task("task1", 2),
  new Task("task2", 5),
  new Task("task3", 8),
  new Task("task4", 3)
];

 
function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield task;
  }
}

 
async function processTasks() {
  const taskGen = taskGenerator(tasks);

  for (const task of taskGen) {
    await new Promise(resolve => {
      setTimeout(() => {
        print(`Completed: ${task.name}`);
        resolve();
      }, task.duration * 1000);
    });
  }
}

 
const TASK_ID = Symbol('taskId');
tasks.forEach((task, index) => {
  task[TASK_ID] = index + 1;
});

 
const taskHandler = {
  get: function(target, property) {
    if (property === 'length') {
      return `There are ${target.length} tasks`;
    }
    return target[property];
  }
};

const proxiedTasks = new Proxy(tasks, taskHandler);

 
const [firstTask, ...remainingTasks] = proxiedTasks;

 
print(`First task: ${firstTask.name}, Duration: ${firstTask.duration}`);
print(proxiedTasks.length);

processTasks().then(() => print("All tasks completed!"));

 
const uniqueDurations = new Set(tasks.map(task => task.duration));

print(`Unique durations: ${[...uniqueDurations].join(', ')}`);
