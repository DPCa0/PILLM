 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  processData(data) {
     
    return data.map(({ id, name }) => ({ id, name: name.toUpperCase() }));
  }
}

const fetchDataWithDelay = async (url) => {
  return new Promise((resolve) => setTimeout(() => resolve(new DataFetcher(url).fetchData()), 1000));
};

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const processedData = await fetchDataWithDelay(url);
  print('Processed Data:', processedData);
})();
