class TaskManager {
  #tasks = new Set();

  constructor(...tasks) {
    tasks.forEach(task => this.#tasks.add(task));
  }

  addTask(task) {
    this.#tasks.add(task);
  }

  removeTask(task) {
    this.#tasks.delete(task);
  }

  *[Symbol.iterator]() {
    for (const task of this.#tasks) {
      yield task;
    }
  }

  executeTasks(concurrency = 2) {
    const taskQueue = [...this.#tasks];
    const executeBatch = async () => {
      while (taskQueue.length) {
        const batch = taskQueue.splice(0, concurrency);
        await Promise.all(batch.map(task => task()));
      }
    };
    return executeBatch();
  }
}

 
const task1 = () => new Promise(resolve => setTimeout(() => { print('Task 1 complete'); resolve(); }, 1000));
const task2 = () => new Promise(resolve => setTimeout(() => { print('Task 2 complete'); resolve(); }, 500));
const task3 = () => new Promise(resolve => setTimeout(() => { print('Task 3 complete'); resolve(); }, 2000));
const task4 = () => new Promise(resolve => setTimeout(() => { print('Task 4 complete'); resolve(); }, 1500));

const manager = new TaskManager(task1, task2, task3, task4);

(async () => {
  for await (const task of manager) {
    print('Executing:', task.name);
  }
  await manager.executeTasks();
})();
