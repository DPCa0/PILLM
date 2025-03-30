class DataFetcher {
  constructor(url) {
    this.url = url;
  }
  
  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  processData(data) {
    return data.map(({ id, value }) => ({ id, squared: value ** 2 }));
  }
}

async function* streamProcessedData(url) {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();
  
  for (const item of data) {
    yield item;
  }
}

(async () => {
  const dataIterator = streamProcessedData('https://api.example.com/data');
  for await (const item of dataIterator) {
    print(`ID: ${item.id}, Squared Value: ${item.squared}`);
  }
})();
