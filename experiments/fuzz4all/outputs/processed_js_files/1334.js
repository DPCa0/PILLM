 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

   
  async fetchData() {
    print(`Fetching data from ${this.url}...`);
    await delay(1000);  
     
    return {
      status: 200,
      data: { name: 'Example', version: '1.0' }
    };
  }
}

 
(async () => {
  const fetcher = new DataFetcher('https://api.example.com/data');
  
  try {
    const { status, data: { name, version } } = await fetcher.fetchData();  
    if (status === 200) {
      print(`Fetched data successfully: Name - ${name}, Version - ${version}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
