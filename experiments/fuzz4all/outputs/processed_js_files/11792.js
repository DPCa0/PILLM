Certainly! Here's a JavaScript program that uses advanced features like Promises, async/await, destructuring, rest/spread operators, and classes:

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.url}?${queryString}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static filterData(data, callback) {
    return data.filter(callback);
  }

  static transformData(data, callback) {
    return data.map(callback);
  }

  *dataIterator() {
    for (const item of this.data) {
      yield item;
    }
  }
}

(async () => {
  try {
    const fetcher = new DataFetcher('https: 
    const rawData = await fetcher.fetchData({ userId: 1 });

    const processedData = DataProcessor.filterData(rawData, ({ id }) => id % 2 === 0);
    const transformedData = DataProcessor.transformData(processedData, ({ title, ...rest }) => ({
      title: title.toUpperCase(),
      ...rest,
    }));

    const dataProcessor = new DataProcessor(transformedData);
    for (const { title, id } of dataProcessor.dataIterator()) {
      print(`Title: ${title}, ID: ${id}`);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();

This code does the following:
1. It defines a `DataFetcher` class to fetch data from an API using async/await.
2. It defines a `DataProcessor` class with static methods for filtering and transforming data.
3. It uses a generator within `DataProcessor` to iterate over data.
4. The main function fetches data, processes it, and logs the results using object destructuring and rest/spread syntax.