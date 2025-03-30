Certainly! Here is a JavaScript program that utilizes advanced features like async/await, Promises, destructuring, and modern ES6+ syntax:

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

class DataProcessor {
  static process(data) {
    const filtered = data.filter(({ active }) => active);
    return filtered.map(({ id, name }) => ({ id, name }));
  }
}

(async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/users');
  
  try {
    const data = await fetcher.fetchData();
    const processedData = DataProcessor.process(data);
    
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

This code snippet defines a `DataFetcher` class to fetch data from a URL using the Fetch API with `async/await`. The `DataProcessor` class contains a static method to filter and map over this data. Finally, an IIFE (Immediately Invoked Function Expression) is used to asynchronously execute the fetch and process the data, with error handling included.