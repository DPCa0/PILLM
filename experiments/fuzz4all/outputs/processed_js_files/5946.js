class Logger {
  constructor() {
    this.logs = [];
  }

  log(message) {
    this.logs.push(message);
    print(message);
  }
}

const logger = new Logger();

async function fetchData(url) {
  logger.log(`Fetching data from ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const gen = dataGenerator(data);

    for (let item of gen) {
      logger.log(`Title: ${item.title}`);
    }
  } catch (error) {
    logger.log(`Error: ${error.message}`);
  }
})();
