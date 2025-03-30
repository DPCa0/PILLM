 

 
class DelayedTask {
  constructor(name, delay) {
    this.name = name;
    this.delay = delay;
  }

  async performTask() {
    print(`Starting task: ${this.name}`);
    await new Promise(resolve => setTimeout(resolve, this.delay));
    print(`Completed task: ${this.name}`);
  }
}

 
async function executeTasks(...tasks) {
  const promises = tasks.map(task => task.performTask());
  await Promise.all(promises);
}

 
const taskData = [
  { name: 'Task 1', delay: 1000 },
  { name: 'Task 2', delay: 2000 },
  { name: 'Task 3', delay: 1500 },
];

const tasks = taskData.map(({ name, delay }) => new DelayedTask(name, delay));

 
(async () => {
  print('Executing tasks concurrently');
  await executeTasks(...tasks);
  print('All tasks completed');
})();
