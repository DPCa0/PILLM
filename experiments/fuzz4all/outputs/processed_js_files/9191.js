 
(async function() {
   
  const user = {
    name: 'Alice',
    age: 28,
  };

  const handler = {
    get: (target, prop) => {
      print(`Property '${prop}' accessed`);
      return Reflect.get(target, prop);
    }
  };

  const proxiedUser = new Proxy(user, handler);

   
  const taskSymbol = Symbol('task');

   
  class Task {
    static count = 0;

    #title;
    
    constructor(title) {
      this.#title = title;
      Task.count++;
    }

    getTitle() {
      return this.#title;
    }
  }

   
  const taskMap = new Map();
  taskMap.set(taskSymbol, new Task('Learn Advanced JS'));

   
  const simulateAsyncTask = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

  const results = await Promise.all([
    simulateAsyncTask('Result 1', 1000),
    simulateAsyncTask('Result 2', 500),
  ]);

  print('All tasks completed:', results);

   
  const resultTitle = taskMap.get(taskSymbol)?.getTitle() ?? 'Unknown Task';
  
  print('Accessed Task Title:', resultTitle);
  print(`User's Name:`, proxiedUser.name);
})();
