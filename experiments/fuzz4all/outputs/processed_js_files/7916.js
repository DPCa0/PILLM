 
class TaskManager {
  #tasks = [];

   
  #validateTask(task) {
    if (typeof task !== 'string' || task.trim() === '') {
      throw new Error('Invalid task');
    }
  }

   
  addTask(task) {
    this.#validateTask(task);
    this.#tasks.push({ task, completed: false });
    print(`Added task: ${task}`);
  }

   
  completeTask(index) {
    if (index < 0 || index >= this.#tasks.length) {
      throw new Error('Invalid task index');
    }
    this.#tasks[index].completed = true;
    print(`Completed task: ${this.#tasks[index].task}`);
  }

   
  *getTasks() {
    for (const task of this.#tasks) {
      yield task;
    }
  }

   
  static taskSummary(tasks) {
    return tasks.reduce(
      (summary, task) => {
        summary.total += 1;
        if (task.completed) summary.completed += 1;
        return summary;
      },
      { total: 0, completed: 0 }
    );
  }
}

 
async function simulateTaskProcessing() {
  const manager = new TaskManager();

   
  manager.addTask('Learn JavaScript');
  manager.addTask('Write complex code');
  manager.addTask('Review code');

   
  for await (const delay of [1000, 500, 2000]) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    manager.completeTask(manager.getTasks().next().value ? 0 : 1);
  }

   
  const tasks = [...manager.getTasks()];
  const summary = TaskManager.taskSummary(tasks);
  print(`Tasks Summary: ${summary.completed}/${summary.total} completed.`);
}

simulateTaskProcessing();
