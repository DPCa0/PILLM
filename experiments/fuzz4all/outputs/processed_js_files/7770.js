 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const processData = async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com';
  const fetcher = new DataFetcher(apiUrl);

   
  const [{ userId, id, title }] = await fetcher.fetchData('/posts');
  print(`User: ${userId}, Post ID: ${id}, Title: "${title}"`);

   
  const endpoints = ['/posts/1', '/posts/2', '/posts/3'];
  const dataPromises = endpoints.map(endpoint => fetcher.fetchData(endpoint));
  const results = await Promise.all(dataPromises);
  
  results.forEach(({ title }) => {
    print(`Post Title: "${title}"`);
  });

   
  const uniqueKey = Symbol('uniqueKey');
  const obj = {
    [uniqueKey]: 'This is a unique value'
  };
  
  print(obj[uniqueKey]);
};

processData();
