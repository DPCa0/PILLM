 
class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData(id) {
    try {
      const response = await fetch(`${this.apiEndpoint}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

class DataProcessor {
  constructor(dataFetcher) {
    this.dataFetcher = dataFetcher;
  }

  async process(id) {
    const data = await this.dataFetcher.fetchData(id);
    if (data) {
      const processedData = this.transformData(data);
      this.displayData(processedData);
    }
  }

  transformData({ name, age, ...details }) {
     
    return {
      fullName: name.toUpperCase(),
      ageCategory: age > 18 ? 'Adult' : 'Minor',
      ...details,
    };
  }

  displayData(data) {
     
    console.log(`Processed Data:
    Name: ${data.fullName}
    Age Category: ${data.ageCategory}
    Details: ${JSON.stringify(data, null, 2)}`);
  }
}

const apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
const dataFetcher = new DataFetcher(apiEndpoint);
const dataProcessor = new DataProcessor(dataFetcher);

(async () => {
  await dataProcessor.process(1);  
})();
