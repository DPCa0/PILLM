class Task {
  #name;
  #completed;
  constructor(name) {
    this.#name = name;
    this.#completed = false;
  }
  get name() {
    return this.#name;
  }
  complete() {
    this.#completed = true;
  }
  toString() {
    return `${this.#name} is ${this.#completed ? 'completed' : 'not completed'}`;
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function* taskGenerator(tasks) {
  for (const task of tasks) {
    yield task;
  }
}

(async () => {
  const tasks = ['Buy groceries', 'Walk the dog', 'Complete project'].map(task => new Task(task));
  const taskIterator = taskGenerator(tasks);

  for (const task of taskIterator) {
    print(task.toString());
    await delay(1000);  
    task.complete();
    print(`After completion: ${task.toString()}`);
  }

  const completedTasks = tasks.filter(t => t.toString().includes('completed'));
  const completedTaskNames = completedTasks.map(task => task.name);

  const uniqueCompletedTasks = new Set(completedTaskNames);
  print('All unique completed tasks:', [...uniqueCompletedTasks]);
})();
