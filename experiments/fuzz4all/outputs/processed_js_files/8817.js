 

class APIService {
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
  constructor(data) {
    this.data = data;
  }

  processData() {
    const processed = this.data.map(({ id, name, ...rest }) => ({
      id,
      name: name.toUpperCase(),
      details: { ...rest }
    }));
    return processed;
  }
}

(async () => {
  const api = new APIService('https://jsonplaceholder.typicode.com/users');
  try {
    const data = await api.fetchData();
    const processor = new DataProcessor(data);
    const processedData = processor.processData();
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
