 
class DataFetcher {
  constructor(apiUrls) {
    this.apiUrls = apiUrls;
  }

   
  *urlGenerator() {
    for (const url of this.apiUrls) {
      yield url;
    }
  }

   
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data from ${url}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

   
  async fetchAllData() {
    const generator = this.urlGenerator();
    const promises = [];
    for (const url of generator) {
      promises.push(this.fetchData(url));
    }
    return await Promise.all(promises);
  }
}

 
(async () => {
  const apiUrls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];
  
  const dataFetcher = new DataFetcher(apiUrls);
  const allData = await dataFetcher.fetchAllData();

   
  allData.forEach((data, index) => {
    if (data) {
      const { userId, id, title, body } = data;
      print(`Post ${index + 1}:`, { userId, id, title, body });
    } else {
      print(`Post ${index + 1}: Data not available`);
    }
  });
})();
