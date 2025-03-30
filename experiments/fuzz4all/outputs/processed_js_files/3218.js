 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Fetching data failed:", error);
      throw error;
    }
  }
}

class Processor {
  process({ id, title, completed }) {
    print(`Processing Task - ID: ${id}, Title: ${title}, Completed: ${completed}`);
    return { id, title, completed };
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const fetcher = new DataFetcher(url);
  
  try {
    const data = await fetcher.fetchData();
    const processor = new Processor();
    const processedData = processor.process(data);

    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Task with ID ${processedData.id} processed successfully`);
      }, 1000);
    });

    print(result);
  } catch (error) {
    console.error('Error in async operation:', error);
  }
})();
