 
class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

const handler = {
  get: function(target, prop, receiver) {
    print(`Fetching the ${prop} property...`);
    return Reflect.get(...arguments);
  },
};

(async () => {
  const api = new DataFetcher('https://jsonplaceholder.typicode.com/posts/1');
  const proxyApi = new Proxy(api, handler);
  try {
    const data = await proxyApi.fetchData();
    print('Fetched data:', data);
  } catch (e) {
    print('Failed to fetch data:', e.message);
  }
})();
