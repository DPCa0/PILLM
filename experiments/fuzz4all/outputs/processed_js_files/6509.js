class AsyncOperation {
  constructor(name) {
    this.name = name;
    this.state = "pending";
  }

  async performTask(duration) {
    print(`${this.name} started`);
    await new Promise(resolve => setTimeout(resolve, duration));
    this.state = "completed";
    print(`${this.name} completed`);
  }
}

async function* taskGenerator() {
  const tasks = [
    new AsyncOperation("Task 1"),
    new AsyncOperation("Task 2"),
    new AsyncOperation("Task 3")
  ];

  for (const task of tasks) {
    yield task.performTask(Math.random() * 2000);
  }
}

async function processTasks() {
  for await (const taskPromise of taskGenerator()) {
    await taskPromise;
  }
  print("All tasks finished!");
}

const main = async () => {
  const results = await Promise.all([
    (async () => {
      const values = [1, 2, 3, 4, 5];
      print("Squared Values:", values.map(x => x ** 2));
      return values;
    })(),
    processTasks()
  ]);

  print("Results:", results);
};

main().catch(error => console.error("Error:", error));
