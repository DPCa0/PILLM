 

class API {
  constructor(url) {
    this.url = url;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.url}/${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

class DataProcessor {
  static process(data) {
    return data.map(({ id, name }) => ({ id, name: name.toUpperCase() }));
  }
}

(async () => {
  const api = new API('https://jsonplaceholder.typicode.com');
  const users = await api.fetchData('users');
  
  if (users) {
    const processedData = DataProcessor.process(users);

    processedData.forEach(({ id, name }) => {
      print(`User ID: ${id}, Name: ${name}`);
    });
  }
})();
