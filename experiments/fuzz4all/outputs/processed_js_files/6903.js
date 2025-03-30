class ComplexSystem {
  constructor() {
    this.cache = new Map();
  }

  memoize(fn) {
    return (...args) => {
      const key = JSON.stringify(args);
      if (!this.cache.has(key)) {
        this.cache.set(key, fn(...args));
      }
      return this.cache.get(key);
    };
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    } catch (error) {
      console.error('Fetching error:', error);
      throw error;
    }
  }

  async processComplexData(urls) {
    try {
      const fetchDataMemoized = this.memoize(this.fetchData);
      const dataPromises = urls.map(url => fetchDataMemoized(url));
      const results = await Promise.all(dataPromises);
      
      return results.flatMap(data => data.items)
                    .filter(item => item.isActive)
                    .map(item => ({ id: item.id, name: item.name }));
    } catch (error) {
      console.error('Data processing error:', error);
    }
  }
}

(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
  ];
  const complexSystem = new ComplexSystem();
  const processedData = await complexSystem.processComplexData(urls);
  print(processedData);
})();
