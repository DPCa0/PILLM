class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      this.data = jsonData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  *dataIterator() {
    for (let item of this.data) {
      yield item;
    }
  }

  processAndFilter(callback) {
    return this.data.map(callback).filter(Boolean);
  }
}

 
(async () => {
  const processor = new DataProcessor([]);
  await processor.fetchData('https://jsonplaceholder.typicode.com/posts');

  const transform = (item) => item.userId === 1 ? { id: item.id, title: item.title.toUpperCase() } : null;
  const filteredData = processor.processAndFilter(transform);

  print('Filtered and Transformed Data:', filteredData);

  print('Iterating through transformed data:');
  for (let item of processor.dataIterator()) {
    print(item);
  }
})();
