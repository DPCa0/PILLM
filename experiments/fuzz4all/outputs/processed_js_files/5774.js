 
import fs from 'fs/promises';
import fetch from 'node-fetch';

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  async processData() {
    try {
      const transformed = await this.constructor.transformData(this.data);
      print('Transformed Data:', transformed);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

   
  static async transformData(data) {
    return data
      .filter(item => item.active)
      .map(item => ({ ...item, active: false, updated: true }))
      .sort((a, b) => a.id - b.id);
  }

   
  static async *fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      for (const item of data) {
        yield item;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

 
(async () => {
  const rawData = JSON.parse(await fs.readFile('data.json', 'utf8'));
  const processor = new DataProcessor(rawData);

  await processor.processData();

   
  for await (const data of DataProcessor.fetchData('https://api.example.com/data')) {
    print('Fetched Data:', data);
  }
})();
