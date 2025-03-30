const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  return response.json();
};

const processData = ({ data, transformFn }) =>
  data.map(transformFn).filter((item) => item !== null);

class DataAnalyzer {
  constructor() {
    this.data = [];
  }

  async loadAndProcessData(url, transformFn) {
    try {
      const fetchedData = await fetchData(url);
      this.data = processData({ data: fetchedData, transformFn });
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  getSummary() {
    return {
      count: this.data.length,
      uniqueValues: [...new Set(this.data)],
    };
  }

  logSummary() {
    const { count, uniqueValues } = this.getSummary();
    print(`Data Count: ${count}, Unique Values:`, uniqueValues);
  }
}

const transformFunction = (item) => (item.value > 10 ? item.name : null);

(async () => {
  const analyzer = new DataAnalyzer();
  await analyzer.loadAndProcessData('https://api.example.com/data', transformFunction);
  analyzer.logSummary();
})();
