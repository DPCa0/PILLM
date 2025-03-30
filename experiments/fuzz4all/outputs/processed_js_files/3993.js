(async () => {
   
  const tasks = new Map();
  const priorities = new Set(['High', 'Medium', 'Low']);

   
  const createTask = ([name, priority]) => {
    if (!priorities.has(priority)) throw new Error('Invalid priority');
    tasks.set(name, { name, priority });
  };

   
  const fetchTasks = () => new Promise(resolve => {
    setTimeout(() => {
      resolve([
        ['Task 1', 'High'],
        ['Task 2', 'Medium'],
        ['Task 3', 'Low'],
      ]);
    }, 1000);
  });

   
  const updateTask = (name, updates) => {
    if (!tasks.has(name)) throw new Error('Task not found');
    const existingTask = tasks.get(name);
    tasks.set(name, { ...existingTask, ...updates });
  };

   
  try {
    const taskList = await fetchTasks();
    taskList.forEach(createTask);

     
    updateTask('Task 1', { priority: 'Low' });

     
    print(`Updated Task List:`);
    for (const [name, { priority }] of tasks) {
      print(`${name}: ${priority}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
