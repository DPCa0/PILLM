 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    }
  }
}

const dataHandler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} doesn't exist`);
      return undefined;
    }
  }
};

const fetchDataWithProxy = async (url) => {
  const fetcher = new DataFetcher(url);
  const proxyFetcher = new Proxy(fetcher, dataHandler);
  try {
    const data = await proxyFetcher.fetchData();
    print('Data fetched successfully:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Replace 'https: 
fetchDataWithProxy('https://jsonplaceholder.typicode.com/todos/1');
