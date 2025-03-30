 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  process() {
     
    return this.data.map(({ id, value }) => ({
      id,
      processedValue: value * 2,
    }));
  }
}

const runApp = async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/todos');
  const data = await fetcher.fetchData();

  if (data) {
    const processor = new DataProcessor(data);
    const processedData = processor.process();
    print(processedData);
  }
};

 
runApp();
