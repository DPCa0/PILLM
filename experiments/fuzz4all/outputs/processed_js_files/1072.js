 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
     
    return new Proxy(this, {
      get(target, propKey) {
        const origMethod = target[propKey];
        return (...args) => {
          print(`Method ${propKey} was called`);
          return origMethod.apply(target, args);
        };
      },
    });
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async getDataParallel(endpoints) {
    const fetchPromises = endpoints.map((endpoint) => this.fetchData(endpoint));
    return await Promise.all(fetchPromises);
  }
}

const apiHandler = new DataFetcher('https://jsonplaceholder.typicode.com');

 
(async () => {
  const [posts, users, comments] = await apiHandler.getDataParallel([
    '/posts',
    '/users',
    '/comments',
  ]);

  print('Fetched Posts:', posts.slice(0, 2));  
  print('Fetched Users:', users.slice(0, 2));  
  print('Fetched Comments:', comments.slice(0, 2));  
})();
