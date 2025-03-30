 
class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    try {
       
      const responses = await Promise.all(this.urls.map(url => fetch(url)));
       
      const jsonDataPromises = responses.map(response => response.json());
      const data = await Promise.all(jsonDataPromises);
      
       
      data.forEach(({ id, title, body }) => {
        print(`ID: ${id}, Title: ${title}`);
        print(`Body: ${body}\n`);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
];

 
const dataFetcher = new DataFetcher(urls);
dataFetcher.fetchData();
