 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
  process() {
     
    return this.data.map(({ id, name, value }) => ({
      id,
      name: name.toUpperCase(),
      value: value * 2
    }));
  }
}

(async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');
  const data = await fetcher.fetchData('/users');
  if (data) {
    const processor = new DataProcessor(data);
    const processedData = processor.process();
    print(processedData);
  }
})();
