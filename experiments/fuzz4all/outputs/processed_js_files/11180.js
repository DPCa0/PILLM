class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  static filterData(data, predicate) {
    return data.filter(predicate);
  }

  transformData(mapper) {
    return this.data.map(mapper);
  }

  async process(url, predicate, mapper) {
    const remoteData = await this.fetchData(url);
    const combinedData = [...this.data, ...remoteData];
    const filteredData = DataProcessor.filterData(combinedData, predicate);
    return this.transformData.call({ data: filteredData }, mapper);
  }
}

(async () => {
  const localData = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(localData);

  const url = 'https://jsonplaceholder.typicode.com/posts';
  const isEven = (num) => num % 2 === 0;
  const double = (num) => num * 2;

  const processedData = await processor.process(url, isEven, double);
  print(processedData);
})();
