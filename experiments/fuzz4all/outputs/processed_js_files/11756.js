class AsyncManager {
  constructor(tasks) {
    this.tasks = tasks;
  }
  
  async executeSequentially() {
    for (let task of this.tasks) {
      try {
        const result = await task();
        print(`Task completed with result: ${result}`);
      } catch (error) {
        print(`Task failed with error: ${error}`);
      }
    }
  }
  
  async executeConcurrently() {
    const taskPromises = this.tasks.map(task => task());
    try {
      const results = await Promise.all(taskPromises);
      results.forEach((result, index) => 
        console.log(`Task ${index} completed with result: ${result}`)
      );
    } catch (error) {
      print(`One or more tasks failed with error: ${error}`);
    }
  }
}

function getRandomTask(id) {
  return () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;
      success ? resolve(`Task ${id} done`) : reject(`Task ${id} error`);
    }, Math.random() * 2000);
  });
}

(async () => {
  const tasks = [getRandomTask(1), getRandomTask(2), getRandomTask(3)];
  const asyncManager = new AsyncManager(tasks);

  print('Executing sequentially...');
  await asyncManager.executeSequentially();

  print('\nExecuting concurrently...');
  await asyncManager.executeConcurrently();
})();
