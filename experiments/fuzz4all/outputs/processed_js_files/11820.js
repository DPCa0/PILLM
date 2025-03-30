 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      this.data = [...this.data, ...jsonData];
      return this.data;
    } catch (error) {
      console.error('Fetching error:', error);
      return [];
    }
  }

  filterData(callback) {
    return this.data.filter(callback);
  }

  transformData(callback) {
    return this.data.map(callback);
  }

  async processData(url, filterCallback, transformCallback) {
    await this.fetchData(url);

     
    const processedData = this.filterData(filterCallback)
      .reduce((acc, item) => {
        return acc.then((data) => {
          data.push(transformCallback(item));
          return data;
        });
      }, Promise.resolve([]));

    return processedData;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    const origMethod = target[prop];
    return function (...args) {
      print(`Method ${prop} is called with arguments: ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

const processor = new Proxy(new DataProcessor([]), handler);

 
(async () => {
  const apiUrl = 'https://api.example.com/data';
  const result = await processor.processData(
    apiUrl,
    item => item.value > 10,
    item => ({ ...item, transformed: true })
  );

  print('Processed Data:', result);
})();
