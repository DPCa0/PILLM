class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async *processData() {
    for (const item of this.data) {
      yield new Promise((resolve) => setTimeout(() => resolve(item * 2), 1000));
    }
  }

  static async executeTasks(tasks) {
    const results = await Promise.all(tasks);
    print("Processed Results:", results);
  }
}

const dataArray = [1, 2, 3, 4, 5];
const processor = new DataProcessor(dataArray);

(async () => {
  const tasks = [];
  for await (const processed of processor.processData()) {
    tasks.push(processed);
  }
  await DataProcessor.executeTasks(tasks);
})();
