 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  fetchData() {
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {  
          resolve({ data: 'Sample Data', timestamp: new Date() });
        } else {
          reject('Failed to fetch data');
        }
      }, 1000);
    });
  }
}

class DataProcessor {
  static async processData(fetcher) {
    try {
      const response = await fetcher.fetchData();
      print('Data Fetched:', response);
      const processedData = { ...response, processed: true };
      print('Processed Data:', processedData);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

 
const handler = {
  get: function(target, propKey) {
    const origMethod = target[propKey];
    return function(...args) {
      print(`Calling ${propKey} with`, args);
      return origMethod.apply(target, args);
    };
  }
};

const apiFetcher = new DataFetcher('https://api.example.com/data');
const proxiedFetcher = new Proxy(apiFetcher, handler);

 
(async () => {
  await DataProcessor.processData(proxiedFetcher);
})();
