class DataManager {
  #privateData;
  
  constructor(data) {
    this.#privateData = data;
  }
  
  *dataGenerator() {
    yield* this.#privateData;
  }
  
  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }

  async processData(url) {
    try {
      const data = await DataManager.fetchData(url);
      this.#privateData = data.map(item => ({ ...item, processed: true }));
      for (const item of this.dataGenerator()) {
        print(`Processing item: ${JSON.stringify(item)}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  getPrivateData() {
    return this.#privateData;
  }
}

(async () => {
  const manager = new DataManager([]);
  await manager.processData('https://jsonplaceholder.typicode.com/posts');
  print('All data processed:', manager.getPrivateData());
})();
