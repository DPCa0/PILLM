 

class AsyncProcessor {
  constructor(tasks) {
    this.tasks = tasks;
  }

  async run() {
    try {
      const results = await Promise.all(this.tasks.map(task => this.processTask(task)));
      return results;
    } catch (error) {
      console.error('Error processing tasks:', error);
      throw error;
    }
  }

  async processTask({ name, delay }) {
    await this.timeout(delay);
    const result = await this.fakeAPICall(name);
    return result;
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fakeAPICall(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.2 ? resolve(`Result for ${name}`) : reject(new Error(`Failed API call for ${name}`));
      }, 500);
    });
  }
}

 
const taskList = [
  { name: 'Task 1', delay: 1000 },
  { name: 'Task 2', delay: 500 },
  { name: 'Task 3', delay: 1500 },
];

(async () => {
  const processor = new AsyncProcessor(taskList);
  try {
    const results = await processor.run();
    results.forEach((result, index) => print(`Task ${index + 1}:`, result));
  } catch (error) {
    console.error('Processing failed:', error);
  }
})();
