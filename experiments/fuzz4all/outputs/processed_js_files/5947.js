class AsyncLogger {
  #logQueue = [];
  
  constructor() {
    this.logProcessor = this.#processLogs();
    this.logProcessor.next();  
  }

  async *#processLogs() {
    while (true) {
      if (this.#logQueue.length > 0) {
        const logItem = this.#logQueue.shift();
        print(`[${new Date().toISOString()}] ${logItem}`);
      }
      await new Promise(resolve => setTimeout(resolve, 100));  
    }
  }

  log(message) {
    this.#logQueue.push(message);
    this.logProcessor.next();  
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

(async () => {
  const logger = new AsyncLogger();
  const dataSources = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

   
  const results = await Promise.allSettled(
    dataSources.map(async url => {
      const data = await fetchData(url);
      return data;
    })
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      logger.log(`Data from source ${index + 1}: ${JSON.stringify(result.value)}`);
    } else {
      logger.log(`Failed to fetch data from source ${index + 1}: ${result.reason}`);
    }
  });

   
  const firstSourceName = results[0]?.value?.name ?? 'Unknown';
  logger.log(`First source name: ${firstSourceName}`);

   
  const totalSources = results.length ?? 0;
  logger.log(`Total sources processed: ${totalSources}`);
})();
