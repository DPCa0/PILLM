 

 
class AsyncTask {
  constructor(id, delay) {
    this.id = id;
    this.delay = delay;
  }

   
  performTask() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Task ${this.id} completed in ${this.delay}ms`);
      }, this.delay);
    });
  }
}

 
async function runTasksInParallel(...tasks) {
  const results = await Promise.all(tasks.map(task => task.performTask()));
  return results;
}

 
async function main() {
  const task1 = new AsyncTask(1, 1000);
  const task2 = new AsyncTask(2, 1500);
  const task3 = new AsyncTask(3, 500);

   
  const [result1, result2, result3] = await runTasksInParallel(task1, task2, task3);
  
  print(result1);
  print(result2);
  print(result3);
}

 
main().catch(console.error);
