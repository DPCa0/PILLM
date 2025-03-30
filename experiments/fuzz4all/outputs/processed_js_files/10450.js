 
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
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

class DataProcessor {
  static process(data) {
    return data.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      tags: item.tags.join(', '),
    }));
  }
}

const fetchAndProcessData = async (url) => {
  const fetcher = new DataFetcher(url);
  try {
    const data = await fetcher.fetchData();
    const processedData = DataProcessor.process(data);
    print(processedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
fetchAndProcessData('https://api.example.com/data');
