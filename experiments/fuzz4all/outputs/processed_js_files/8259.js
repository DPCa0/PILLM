 

class DataProcessor {
  constructor(...urls) {
    this.urls = urls;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
    return response.json();
  }

  async process() {
    try {
      const dataPromises = this.urls.map(url => DataProcessor.fetchData(url));
      const results = await Promise.all(dataPromises);
      const [firstResult, ...restResults] = results;
      print('First Result:', firstResult);
      print('Rest of Results:', restResults);
      print('Merged Data:', {...firstResult, ...restResults.flat()});
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }
}

 
const dataProcessor = new DataProcessor(
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
);

dataProcessor.process();
