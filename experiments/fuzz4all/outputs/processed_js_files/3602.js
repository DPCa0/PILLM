 
class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  processAndLogData() {
    this.fetchData()
      .then(data => {
        if (!data) throw new Error('No data returned from fetch');
        const processedData = this.processData(data);
        this.logData(processedData);
      })
      .catch(error => console.error('Error in processAndLogData:', error));
  }

  processData(data) {
     
    return data.map(item => {
      const { id, name, value } = item;
      return { id, name, value: value * 2 };  
    });
  }

  logData(data) {
    data.forEach(({ id, name, value }) => {
      print(`Item ID: ${id}, Name: ${name}, Value: ${value}`);
    });
  }
}

 
const dataFetcher = new DataFetcher('https://api.example.com/data');
dataFetcher.processAndLogData();
