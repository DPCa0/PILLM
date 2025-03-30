class AsyncManager {
  constructor(tasks) {
    this.tasks = tasks;
  }

  async executeSequentially() {
    for (const task of this.tasks) {
      print(await task());
    }
  }

  async executeConcurrently() {
    const results = await Promise.all(this.tasks.map(task => task()));
    results.forEach(result => print(result));
  }
}

const delayTask = (ms, result) => () => 
  new Promise(resolve => setTimeout(() => resolve(result), ms));

const tasks = [
  delayTask(1000, "Task 1 completed"),
  delayTask(500, "Task 2 completed"),
  delayTask(1500, "Task 3 completed")
];

const manager = new AsyncManager(tasks);

 
(async function() {
  print("Executing Sequentially:");
  await manager.executeSequentially();

  print("\nExecuting Concurrently:");
  await manager.executeConcurrently();
})();
