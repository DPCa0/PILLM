class Logger {
  static #instance;
  #logs = [];

  constructor() {
    if (Logger.#instance) {
      return Logger.#instance;
    }
    Logger.#instance = this;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.#logs.push({ message, timestamp });
    print(`${timestamp} - ${message}`);
  }

  getLogs() {
    return this.#logs;
  }
}

const fetchData = async (url) => {
  const logger = new Logger();
  try {
    logger.log(`Fetching data from ${url}`);
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    let data = await response.json();
    logger.log(`Data received from ${url}`);
    return data;
  } catch (error) {
    logger.log(`Fetch error: ${error.message}`);
  }
};

const processData = async (url) => {
  const logger = new Logger();
  try {
    const data = await fetchData(url);
    if (!data) throw new Error('No data to process');
    logger.log('Processing data...');
    const processedData = data.map(item => ({ ...item, processed: true }));
    logger.log('Data processing complete');
    return processedData;
  } catch (error) {
    logger.log(`Process error: ${error.message}`);
  }
};

 
const url = 'https://api.example.com/data';
processData(url).then(data => print('Processed Data:', data));
