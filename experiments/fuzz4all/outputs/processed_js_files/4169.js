 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  processData(data) {
     
    const { results, ...metadata } = data;
    print('Metadata:', metadata);

     
    const enrichedResults = results.map(item => ({
      ...item,
      enriched: true,
    }));

    return enrichedResults;
  }
}

 
const mockApi = () => new Promise(resolve => setTimeout(() => resolve({
  results: [
    { id: 1, value: 'first' },
    { id: 2, value: 'second' },
  ],
  timestamp: new Date().toISOString(),
  status: 'success',
}), 1000));

(async () => {
  const apiEndpoint = 'https://api.example.com/data';  
  const dataFetcher = new DataFetcher(apiEndpoint);

   
  window.fetch = mockApi;

  try {
    const data = await dataFetcher.fetchData();
    print('Enriched Results:', data);
  } catch (error) {
    console.error('Failed to fetch and process data:', error);
  }
})();
