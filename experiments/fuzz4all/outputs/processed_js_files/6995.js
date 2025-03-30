class DataFetcher {
  #apiUrl = 'https://api.example.com/data';  

  constructor() {
    this.data = null;
  }

   
  async *fetchDataChunks() {
    for (let i = 0; i < 3; i++) {
      await new Promise(res => setTimeout(res, 1000));  
      yield `Chunk ${i + 1} from ${this.#apiUrl}`;
    }
  }

   
  async loadAllData() {
    const dataPromises = [this.loadData(), this.loadData(), this.loadData()];
    const results = await Promise.allSettled(dataPromises);
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`Data load ${index + 1} succeeded: ${result.value}`);
      } else {
        console.error(`Data load ${index + 1} failed: ${result.reason}`);
      }
    });
  }

   
  async loadData() {
    try {
      for await (let chunk of this.fetchDataChunks()) {
        print(`Received: ${chunk}`);
      }
      return 'All data loaded successfully';
    } catch (error) {
      throw new Error('Failed to load data');
    }
  }

   
  static async create() {
    const instance = new DataFetcher();
    await instance.loadAllData();
    return instance;
  }
}

 
(async () => {
  const dataFetcher = await DataFetcher.create();
  print('DataFetcher instance created:', dataFetcher);
})();
