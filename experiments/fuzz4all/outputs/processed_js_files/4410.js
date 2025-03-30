class DataManager {
  #data;
  
  constructor() {
    this.#data = [];
  }

  addEntry(entry) {
    if (typeof entry !== 'object' || entry === null) throw new Error('Invalid entry');
    this.#data.push({ ...entry, timestamp: new Date().toISOString() });
  }

  getEntries() {
    return this.#data.map(({ timestamp, ...entry }) => entry);
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      this.addEntry(result);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

async function main() {
  const manager = new DataManager();

   
  manager.addEntry({ name: 'Alice', age: 30 });
  manager.addEntry({ name: 'Bob', age: 25 });
  print('Local Entries:', manager.getEntries());

   
  await manager.fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const firstEntry = manager.getEntries()?.[0] ?? 'No entries found';
  print('First Entry:', firstEntry);
}

main();
