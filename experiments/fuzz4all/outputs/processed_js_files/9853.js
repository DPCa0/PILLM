 

class DataFetcher {
  constructor() {
    this.url = 'https://api.example.com/data';
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  processData(data) {
     
    const processedData = data.map(({ id, value }) => ({ id, value: value * 2 }));
    const uniqueData = [...new Set(processedData.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));
    return this.filterData(uniqueData);
  }

  filterData(data) {
     
    const filteredData = data.filter(item => item.value > 10);
    const reducedData = filteredData.reduce((acc, { value }) => acc + value, 0);
    return { filteredData, totalValue: reducedData };
  }
}

 
const handler = {
  get(target, propKey) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Called ${propKey} with arguments: ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

const fetcher = new DataFetcher();
const proxiedFetcher = new Proxy(fetcher, handler);

 
(async () => {
  const result = await proxiedFetcher.fetchData();
  print('Final Processed Result:', result);
})();
