class AsyncDataHandler {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }
}

function* dataProcessor(data) {
  for (const item of data) {
    yield { ...item, processed: true };
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts';

(async () => {
  const handler = new AsyncDataHandler(url);
  try {
    const rawData = await handler.fetchData();
    const processedData = dataProcessor(rawData);
    
    const [first, second, ...rest] = processedData;
    print('First:', first);
    print('Second:', second);
    
    rest.forEach((item, index) => {
      print(`Rest[${index}]:`, item);
    });

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
