 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    const promises = this.urls.map(url => fetch(url).then(res => res.json()));
    return Promise.all(promises);
  }
}

class DataProcessor {
  static processAllData(dataArray) {
    return dataArray.map(data => {
      const { id, name, ...otherDetails } = data;
      return {
        identifier: id,
        fullName: name.toUpperCase(),
        details: { ...otherDetails }
      };
    });
  }
}

(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/posts'];
  const fetcher = new DataFetcher(urls);
  
  try {
    const [userData, postData] = await fetcher.fetchData();
    
    const processedUsers = DataProcessor.processAllData(userData);
    const processedPosts = DataProcessor.processAllData(postData);

    print('Processed Users:', processedUsers);
    print('Processed Posts:', processedPosts);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
