 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static processData({ items }) {
    return items.map(item => ({
      id: item.id,
      value: item.value * 2,
    }));
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  const dataFetcher = new DataFetcher(url);

  try {
    const rawData = await dataFetcher.fetchData();
    const processedData = DataProcessor.processData(rawData);
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error in data processing:', error);
  }
})();
