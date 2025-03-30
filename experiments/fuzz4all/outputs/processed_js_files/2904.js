class AsyncManager {
  constructor() {
    this.tasks = [];
  }

  addTask(promise) {
    this.tasks.push(promise);
  }

  async executeTasks() {
    try {
      const results = await Promise.all(this.tasks);
      return results;
    } catch (error) {
      console.error('A task failed:', error);
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

function* numberGenerator() {
  let number = 0;
  while (true) {
    number += 2;
    yield number;
  }
}

(async () => {
  const manager = new AsyncManager();
  const generator = numberGenerator();

  for (let i = 0; i < 3; i++) {
    const url = `https: 
    manager.addTask(fetchData(url));
  }

  const results = await manager.executeTasks();
  results.forEach((result, index) => print(`Task ${index + 1}:`, result));
})();
