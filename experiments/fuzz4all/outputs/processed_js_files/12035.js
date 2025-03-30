class AsyncLogger {
  #messages = [];
  
  constructor() {
    this.#init();
  }
  
  async #init() {
    for await (const message of this.#messageGenerator()) {
      print(message);
    }
  }
  
  async *#messageGenerator() {
    while (this.#messages.length > 0) {
      await this.#simulateDelay();
      yield this.#messages.shift();
    }
  }
  
  #simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, 500));
  }
  
  log(message) {
    this.#messages.push(message);
    if (this.#messages.length === 1) {
      this.#init();  
    }
  }
}

class NetworkRequest {
  static async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      throw new Error(`Fetch error: ${error.message}`);
    }
  }
}

(async () => {
  const logger = new AsyncLogger();
  
  logger.log("Starting network requests...");

  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
  ];

  const fetchPromises = urls.map(async (url) => {
    try {
      const data = await NetworkRequest.fetchData(url);
      logger.log(`Fetched data from ${url}: ${JSON.stringify(data)}`);
    } catch (error) {
      logger.log(`Error fetching data from ${url}: ${error.message}`);
    }
  });

  await Promise.all(fetchPromises);
  logger.log("All network requests completed.");
})();
