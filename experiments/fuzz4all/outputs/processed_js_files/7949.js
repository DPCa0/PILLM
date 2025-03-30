 
const simulateAsyncTask = (taskName, duration) =>
  new Promise((resolve) => {
    setTimeout(() => {
      print(`${taskName} completed.`);
      resolve(taskName);
    }, duration);
  });

const taskRunner = async () => {
  const tasks = new Map([
    ['Task 1', 1000],
    ['Task 2', 500],
    ['Task 3', 1500]
  ]);

   
  const handler = {
    get: (target, property, receiver) => {
      if (target.has(property)) {
        print(`Starting ${property}`);
        return target.get(property);
      }
      return Reflect.get(target, property, receiver);
    }
  };

  const proxiedTasks = new Proxy(tasks, handler);

  const results = [];
  for (const [taskName] of tasks) {
    const duration = proxiedTasks[taskName];  
    const result = await simulateAsyncTask(taskName, duration);
    results.push(result);
  }

  print('All tasks completed:', results);
};

taskRunner().catch(console.error);
