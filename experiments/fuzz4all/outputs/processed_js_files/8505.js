 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  processData(data) {
    const { results } = data;
    const [first, ...rest] = results;
    return { firstItem: first, remaining: rest };
  }
}

const processAndDisplayData = async () => {
  const fetcher = new DataFetcher('https://api.example.com/data');
  const { firstItem, remaining } = await fetcher.fetchData();

  print('First item:', firstItem);
  print('Remaining items count:', remaining.length);

   
  const enhancedFirstItem = { ...firstItem, processed: true };
  print('Enhanced first item:', enhancedFirstItem);
};

processAndDisplayData();
