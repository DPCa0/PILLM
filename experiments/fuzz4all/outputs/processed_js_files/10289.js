 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  processData(data) {
     
    const { userId, title, body } = data;
    return { userId, title, body };
  }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const fetcher = new DataFetcher(url);
  
  print('Fetching data...');
  const data = await fetcher.fetchData();
  
  if (data) {
    print('Data fetched:', data);
    
    print('Simulating delay...');
    await delay(2000);
    
    print('Process completed');
  } else {
    print('Failed to fetch data');
  }
})();
