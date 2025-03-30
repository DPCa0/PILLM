class Scheduler {
  constructor() {
    this.tasks = new Map();
  }

  addTask(name, fn, delay) {
    const task = async () => {
      print(`Starting task: ${name}`);
      await fn();
      print(`Completed task: ${name}`);
    };
    this.tasks.set(name, setTimeout(task, delay));
  }

  removeTask(name) {
    if (this.tasks.has(name)) {
      clearTimeout(this.tasks.get(name));
      this.tasks.delete(name);
      print(`Removed task: ${name}`);
    }
  }

  listTasks() {
    print("Scheduled tasks:", ...this.tasks.keys());
  }
}

const scheduler = new Scheduler();

scheduler.addTask("Task1", async () => {
  const result = await new Promise(resolve => setTimeout(() => resolve('Task1 result'), 500));
  print(result);
}, 1000);

scheduler.addTask("Task2", async () => {
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve({ data: 'some data' }), 800));
  const data = await fetchData();
  print("Fetched Data:", data);
}, 1500);

scheduler.addTask("Task3", async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(100);
  print("Quick task done!");
}, 200);

scheduler.listTasks();
setTimeout(() => scheduler.removeTask("Task2"), 500); 
