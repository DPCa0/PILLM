 
class DataFetcher {
  constructor() {
    this.data = { items: [] };
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      this.data.items = result.items;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  get proxy() {
    return new Proxy(this.data, {
      get: (target, prop) => {
        if (prop === 'items') {
          print('Accessing items...');
          return target[prop];
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        if (prop === 'items') {
          print('Setting items...');
          target[prop] = value.map(item => ({ ...item, timestamp: Date.now() }));
          return true;
        }
        target[prop] = value;
        return true;
      }
    });
  }
}

(async () => {
  const dataFetcher = new DataFetcher();
  await dataFetcher.fetchData('https://api.example.com/data');

  print(dataFetcher.proxy.items);  

  dataFetcher.proxy.items = [
    { name: 'Sample 1' },
    { name: 'Sample 2' },
  ];  

  print(dataFetcher.proxy.items);
})();
