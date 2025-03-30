class Task {
  constructor(title, timeEstimate) {
    this.title = title;
    this.timeEstimate = timeEstimate;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeTasks(tasks) {
  for (const task of tasks) {
    print(`Starting task: ${task.title}`);
    await delay(task.timeEstimate);
    task.complete();
    print(`Completed task: ${task.title}`);
  }
  print('All tasks completed!');
}

const tasks = [
  new Task('Write report', 2000),
  new Task('Review PR', 1500),
  new Task('Meeting with team', 3000),
  new Task('Update documentation', 1000)
];

const executeWithLimit = async (tasks, limit) => {
  const results = [];
  const taskGroups = [];
  
  for (let i = 0; i < tasks.length; i += limit) {
    taskGroups.push(tasks.slice(i, i + limit));
  }
  
  for (const group of taskGroups) {
    await Promise.all(group.map(task => {
      return delay(task.timeEstimate).then(() => {
        task.complete();
        print(`Completed task: ${task.title}`);
        results.push(task);
      });
    }));
  }
  
  print('All tasks completed with concurrency limit!');
};

print('Executing tasks without concurrency limit:');
executeTasks(tasks).then(() => {
  const newTasks = [
    new Task('Email response', 500),
    new Task('Code review', 2500),
    new Task('One-on-one', 2000)
  ];
  
  print('Executing tasks with concurrency limit of 2:');
  executeWithLimit(newTasks, 2);
});
