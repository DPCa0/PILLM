 

class DataService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiEndpoint}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    }
  }
}

class DataProcessor {
  process(data) {
    return data.map(({ id, name, details }) => ({
      id,
      name: name.toUpperCase(),
      summary: details.slice(0, 50),
    }));
  }
}

const apiService = new DataService('https://api.example.com/');
const dataProcessor = new DataProcessor();

(async () => {
  try {
    const data = await apiService.fetchData('/items');
    const processedData = dataProcessor.process(data);

    processedData.forEach(({ id, name, summary }) => {
      print(`ID: ${id}, Name: ${name}, Summary: ${summary}`);
    });
  } catch (error) {
    console.error('Error in processing data:', error);
  }
})();
