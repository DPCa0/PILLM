 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }

  processData() {
    const { data } = this;  
    return data.map(({ id, value }) => ({ id, doubledValue: value * 2 }));
  }

  async enrichData(url) {
    try {
      const fetchedData = await DataProcessor.fetchData(url);
      const combinedData = [...this.data, ...fetchedData];  
      return new DataProcessor(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

 
(async () => {
  const initialData = [{ id: 1, value: 10 }, { id: 2, value: 20 }];
  const processor = new DataProcessor(initialData);
  
  print('Processed Data:', processor.processData());
  
  try {
    const enrichedProcessor = await processor.enrichData('https://api.example.com/data');
    print('Enriched Data:', enrichedProcessor.processData());
  } catch (error) {
    console.error('Failed to enrich data:', error);
  }
})();
