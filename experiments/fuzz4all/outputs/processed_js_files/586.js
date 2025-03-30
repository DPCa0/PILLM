 

class DataFetcher {
  constructor() {
     
    this.dataPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ id: 1, name: 'Item 1', value: 100 }), 1000);
    });

     
    this.data = new Proxy({}, {
      get: (target, prop, receiver) => {
        if (!Reflect.has(target, prop)) {
          console.warn(`Property "${prop}" doesn't exist on the data object.`);
          return undefined;
        }
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, value, receiver) => {
        print(`Setting value ${value} to property "${prop}"`);
        return Reflect.set(target, prop, value, receiver);
      }
    });

    // A Map to store additional processed data
    this.processedData = new Map();
  }

  async fetchData() {
    const rawData = await this.dataPromise;

    // Destructure and reassign with transformation
    const { id, name, value: rawValue } = rawData;
    const processedValue = rawValue * 1.1;
    this.data = { id, name, value: processedValue };

    // Populate the Map with processed data
    this.processedData.set(id, { name, processedValue });
  }

  displayData() {
    print('Fetched Data:', this.data);
    print('Processed Data Map:', Array.from(this.processedData.entries()));
  }
}

 
(async () => {
  const dataFetcher = new DataFetcher();
  await dataFetcher.fetchData();
  dataFetcher.displayData();
})();
