class NetworkRequest {
  #url;
  #responseCache = new Map();

  constructor(url) {
    this.#url = url;
  }

  async #fetchData(endpoint) {
    if (this.#responseCache.has(endpoint)) {
      print('Returning cached data...');
      return this.#responseCache.get(endpoint);
    }
    
    print('Fetching new data...');
    const response = await fetch(`${this.#url}${endpoint}`);
    const data = await response.json();
    this.#responseCache.set(endpoint, data);
    return data;
  }

  fetchDataWithTimeout(endpoint, timeout = 5000) {
    return Promise.race([
      this.#fetchData(endpoint),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
    ]);
  }
}

const processResponse = (data) => {
  const refinedData = Object.entries(data).filter(([key, value]) => typeof value === 'number');
  return Object.fromEntries(refinedData);
};

(async () => {
  try {
    const request = new NetworkRequest('https://jsonplaceholder.typicode.com');
    const data = await request.fetchDataWithTimeout('/users', 3000);
    print('Processed Data:', processResponse(data[0]));
  } catch (error) {
    console.error(error.message);
  }
})();
