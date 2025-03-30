class Task {
  #status = 'pending';
  constructor(name) {
    this.name = name;
  }

  async execute() {
    this.#status = 'running';
    print(`${this.name} is running...`);

    await new Promise((resolve) => setTimeout(resolve, 1000));  

    if (Math.random() > 0.5) {
      this.#status = 'completed';
      print(`${this.name} completed successfully.`);
    } else {
      this.#status = 'failed';
      throw new Error(`${this.name} failed.`);
    }
  }

  getStatus() {
    return this.#status;
  }
}

const tasks = [
  new Task('Task 1'),
  new Task('Task 2'),
  new Task('Task 3'),
];

(async () => {
  try {
    await Promise.allSettled(tasks.map(task => task.execute()));
  } catch (error) {
    console.error('Some tasks failed:', error);
  } finally {
    print('Final statuses:', tasks.map(task => `${task.name}: ${task.getStatus()}`));
  }
})();
