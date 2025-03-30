(async () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    return response.json();
  };

  class DataProcessor {
    constructor(data) {
      this.data = data;
    }

    getProcessedData() {
      return this.data.map(item => ({
        ...item,
        timestamp: new Date(item.timestamp).toLocaleString(),
        summary: item.content.substring(0, 100),
      }));
    }

    static filterByKeyword(data, keyword) {
      return data.filter(item => item.content.includes(keyword));
    }
  }

  try {
    await delay(1000);  

    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);

    const processor = new DataProcessor(rawData);
    const processedData = processor.getProcessedData();
    const filteredData = DataProcessor.filterByKeyword(processedData, 'qui');

    console.table(filteredData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
