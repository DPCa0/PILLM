 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

class DataProcessor {
  static processData(data) {
     
    return data.reduce((acc, { id, value }) => {
      acc.push({ id, doubledValue: value * 2 });
      return acc;
    }, []);
  }
}

(async () => {
  const fetcher = new DataFetcher('https://api.example.com/data');
  const rawData = await fetcher.fetchData();
  
  if (rawData) {
    const processedData = DataProcessor.processData(rawData);
    
    print('Processed Data:', processedData);
    
     
    const idsSet = new Set(processedData.map(item => item.id));
    const dataMap = new Map(processedData.map(item => [item.id, item.doubledValue]));
    
    print('Unique IDs:', idsSet);
    print('Data Map:', dataMap);
  }
})();
