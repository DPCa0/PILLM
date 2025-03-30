 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  }
}

class DataProcessor {
  static process({ results, ...metadata }) {
    return {
      summary: metadata,
      processedResults: results.map((item) => ({
        ...item,
        processed: true
      }))
    };
  }
}

const apiHandler = new Proxy(DataFetcher, {
  construct(target, args) {
    print(`Creating instance for API: ${args[0]}`);
    return new target(...args);
  }
});

(async () => {
  const apiUrl = 'https://randomuser.me/api/?results=5';
  const fetcher = new apiHandler(apiUrl);
  const rawData = await fetcher.fetchData();
  
  const processedData = DataProcessor.process(rawData);
  
  const { summary, processedResults } = processedData;
  print('Metadata:', summary);
  print('Results:', processedResults);
})();
