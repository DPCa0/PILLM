Certainly! Below is a JavaScript program utilizing some advanced features such as asynchronous functions, promises, destructuring, template literals, and classes:

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error(`Failed to fetch data: ${error.message}`);
    }
  }

  processData(data) {
    const { title, userId, body } = data;
    return { title, userId, body };
  }
}

const getData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();
  if (data) {
    const { title, userId, body } = data;
    print(`Title: ${title}\nUser ID: ${userId}\nBody: ${body}`);
  }
};

(async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts/1';
  await getData(apiURL);
})();

This script defines a `DataFetcher` class that encapsulates the logic for fetching and processing data from a given URL. It uses `async/await` to handle asynchronous operations, destructures the data object for concise data extraction, and employs template literals for neat output formatting.