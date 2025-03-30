class LazySingleton {
  constructor(name) {
    if (!LazySingleton.instance) {
      this.name = name;
      LazySingleton.instance = this;
    }
    return LazySingleton.instance;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

const runAsyncTask = async (taskId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${taskId} complete`);
    }, Math.random() * 1000);
  });
};

const performTasks = async () => {
  const taskPromises = Array.from({ length: 5 }, (_, i) => runAsyncTask(i + 1));
  const results = await Promise.all(taskPromises);
  print(results);
};

(async () => {
  const singletonA = new LazySingleton('Alice');
  const singletonB = new LazySingleton('Bob');

  print(singletonA.greet());  
  print(singletonB.greet());  
  print(singletonA === singletonB);  

  const numArray = [1, 2, 3, 4, 5];
  const doubled = numArray.map(num => num * 2);
  print(doubled);  

  performTasks();
})();
