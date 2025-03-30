class DataLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadData(key, fetchFunction) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    const data = await fetchFunction();
    this.cache.set(key, data);
    return data;
  }
}

const simulateFetch = () => new Promise((resolve) => setTimeout(() => resolve(Math.random()), 1000));

const process = async (dataLoader, key) => {
  const data = await dataLoader.loadData(key, simulateFetch);
  print(`Processed data: ${data}`);
  return data * 10;
};

const executeTasks = async () => {
  const loader = new DataLoader();
  const tasks = [1, 2, 3].map((i) => process(loader, `key${i}`));
  const results = await Promise.allSettled(tasks);

  print('Task Results:');
  results.forEach(({ status, value, reason }) => {
    if (status === 'fulfilled') {
      print(`Success: ${value}`);
    } else {
      console.error(`Failed: ${reason}`);
    }
  });
};

executeTasks().catch((error) => console.error('Execution error:', error));
