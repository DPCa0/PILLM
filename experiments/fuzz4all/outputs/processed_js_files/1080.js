class Logger {
  static logStyles = {
    info: 'color: blue; font-weight: bold',
    warn: 'color: orange; font-weight: bold',
    error: 'color: red; font-weight: bold'
  };

  static log(message, type = 'info') {
    print(`%c${message}`, this.logStyles[type] || '');
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

async function processData(url) {
  try {
    const data = await fetchJson(url);
    const result = data.map(({ id, name }) => ({ id, name }));
    Logger.log(`Fetched and processed data: ${JSON.stringify(result)}`, 'info');
    return result;
  } catch (error) {
    Logger.log(`Error: ${error.message}`, 'error');
    return [];
  }
}

function* idGenerator(start = 0) {
  let id = start;
  while (true) yield id++;
}

const generator = idGenerator(100);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  Logger.log('Application started', 'info');
  
  for (let i = 0; i < 3; i++) {
    Logger.log(`Generated ID: ${generator.next().value}`, 'info');
  }

  Logger.log('Fetching data...', 'info');
  const dataUrl = 'https://jsonplaceholder.typicode.com/users';
  const processedData = await processData(dataUrl);

  await delay(1000);
  
  Logger.log('Application finished', 'info');
}

main().catch(err => Logger.log(`Unhandled error: ${err.message}`, 'error'));
