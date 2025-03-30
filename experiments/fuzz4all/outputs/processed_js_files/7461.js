 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${this.url}?${queryString}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

class DataProcessor {
  static processData({ results = [] } = {}) {
    return results.map(({ name, email }) => ({
      fullName: name,
      contactEmail: email,
    }));
  }
}

const proxyHandler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
    }
    return Reflect.get(target, prop, receiver);
  },
};

const fetcher = new DataFetcher('https://api.example.com/data');
const dataProxy = new Proxy(fetcher, proxyHandler);

(async () => {
  try {
    const rawData = await dataProxy.fetchData({ limit: 5 });
    const processedData = DataProcessor.processData(rawData);
    
    const logResults = (...results) => {
      results.forEach(({ fullName, contactEmail }) => {
        print(`Name: ${fullName}, Email: ${contactEmail}`);
      });
    };

    logResults(...processedData);
  } catch (error) {
    console.error('Error in processing:', error);
  }
})();
