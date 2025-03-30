class Task {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

const tasks = [
  new Task("Task 1", 30),
  new Task("Task 2", 20),
  new Task("Task 3", 60)
];

const executeTasks = async tasks => {
  console.time("Execution Time");
  await Promise.allSettled(
    tasks.map(task => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.2 ? resolve(task.name) : reject(task.name);
        }, task.duration);
      })
        .then(name => console.log(`Completed: ${name}`))
        .catch(name => console.error(`Failed: ${name}`));
    })
  );
  console.timeEnd("Execution Time");
};

const main = async () => {
  print("Starting Task Execution...");
  await executeTasks(tasks);
  print("Task Execution Finished");
};

main();
