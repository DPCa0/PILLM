 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class TaskProcessor {
  constructor(...tasks) {
    this.tasks = tasks;
  }

   
  async processTasks() {
    for (let [index, task] of this.tasks.entries()) {
      const { name, duration } = task;
      print(`Starting task ${index + 1}: ${name}`);
      await delay(duration);
      print(`Completed task ${index + 1}: ${name}`);
    }
  }
}

 
const createRandomTask = (name) => ({
  name,
  duration: Math.floor(Math.random() * 1000) + 500  
});

 
const [task1, task2, task3] = ['Task One', 'Task Two', 'Task Three'].map(name => createRandomTask(name));

 
const processor = new TaskProcessor(task1, task2, task3);

 
processor.processTasks().then(() => print('All tasks processed!'));
