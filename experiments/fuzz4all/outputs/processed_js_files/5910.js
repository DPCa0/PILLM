 

 
class Task {
  #name;
  #isCompleted = false;
  static taskCount = 0;
  
  constructor(name) {
    this.#name = name;
    Task.taskCount++;
  }
  
  markComplete() {
    this.#isCompleted = true;
    print(`Task "${this.#name}" completed.`);
  }

  static totalTasks() {
    return Task.taskCount;
  }
}

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function handleTasks(tasks) {
  for (const { task, ms } of tasks) {
    await delay(ms);
    task.markComplete();
  }
}

 
const taskList = [
  { task: new Task('Task 1'), ms: 1000 },
  { task: new Task('Task 2'), ms: 2000 },
  { task: new Task('Task 3'), ms: 3000 }
];

 
handleTasks(taskList).then(() => {
  print(`Total Tasks: ${Task.totalTasks()}`);
});

 
function logMessages(...messages) {
  messages.forEach(message => print(message));
}

 
logMessages('All tasks processed.', 'Have a nice day!');
