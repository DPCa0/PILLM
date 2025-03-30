 
class TaskManager {
  #tasks = new Map();

   
  static createTask(description) {
    return TaskManager.#sanitizeInput(description);
  }

  addTask(description) {
    const id = Symbol();
    this.#tasks.set(id, {
      description: TaskManager.createTask(description),
      created: new Date()
    });
    return id;
  }

  getTask(id) {
    const task = this.#tasks.get(id);
    return task ? { ...task } : null;
  }

   
  *listTasks() {
    for (let [id, { description, created }] of this.#tasks) {
      yield { id, description, created };
    }
  }

   
  static #sanitizeInput(input) {
    return input.trim().replace(/[^a-z0-9 ]/gi, '');
  }
}

 
async function executeTask() {
  const taskManager = new TaskManager();

  const taskId = taskManager.addTask('Complete JavaScript ES2023 demo.');
  const task = taskManager.getTask(taskId);
  
  print('Task added:', task);
  
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  print('Listing all tasks:');
  for (let task of taskManager.listTasks()) {
    print(task);
  }
}

executeTask().catch(console.error);
