 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  processData(data) {
    return Object.entries(data)
      .filter(([key, value]) => typeof value === 'number')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value * 2 }), {});
  }
}

(async () => {
  const dataFetcher = new DataFetcher('https://api.example.com/data');
  try {
    const processedData = await dataFetcher.fetchData();
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
