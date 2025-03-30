 

class TaskRunner {
  constructor(tasks) {
    this.tasks = tasks;
  }
  
  async *runTasks() {
    for (const task of this.tasks) {
      yield await this._executeTask(task);
    }
  }

  async _executeTask(task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof task === 'function') {
          try {
            resolve(task());
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error('Task is not a function'));
        }
      }, 1000);
    });
  }
}

async function executeRunner() {
  const tasks = [
    () => 'Task 1 complete',
    () => 'Task 2 complete',
    () => { throw new Error('Task 3 failed'); },
    () => 'Task 4 complete'
  ];
  
  const runner = new TaskRunner(tasks);
  const taskIterator = runner.runTasks();
  for await (const result of taskIterator) {
    print(result);
  }
}

executeRunner().catch(error => console.error(error.message));
