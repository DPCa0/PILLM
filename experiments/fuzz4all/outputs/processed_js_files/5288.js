 
class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

   
  async fetchAll() {
    const fetchPromises = this.urls.map(url => fetch(url).then(response => response.json()));
    try {
      const data = await Promise.all(fetchPromises);
      print('All data fetched:', data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

   
  *dataStream() {
    for (const url of this.urls) {
      yield this.fetchData(url);
    }
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      print(`Data from ${url}:`, data);
      return data;
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
    }
  }
}

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];
const dataFetcher = new DataFetcher(urls);

 
dataFetcher.fetchAll();

 
const dataStream = dataFetcher.dataStream();
for (const dataPromise of dataStream) {
  dataPromise.then(data => {
    print('Streamed data:', data);
  });
}
