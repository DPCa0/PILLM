class Logger {
  static logHistory = [];
  
  static log(message) {
    this.logHistory.push(message);
    print(message);
  }

  static displayHistory() {
    print('Log History:', this.logHistory);
  }
}

const fetchData = async (url) => {
  Logger.log(`Fetching data from ${url}`);
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    Logger.log(`Data received from ${url}: ${JSON.stringify(data, null, 2)}`);
    return data;
  } catch (error) {
    Logger.log(`Error fetching data from ${url}: ${error.message}`);
  }
};

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const results = await Promise.allSettled(urls.map(url => fetchData(url)));

  const successfulResponses = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.value);

  Logger.log(`Successful Responses: ${JSON.stringify(successfulResponses, null, 2)}`);
  Logger.displayHistory();
})();
