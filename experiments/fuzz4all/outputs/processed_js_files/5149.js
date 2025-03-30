class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  async fetchResources() {
    const promises = this.resources.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load: ${url}`);
      return await response.json();
    });
    return Promise.all(promises);
  }

  static logger = (() => {
    const log = (message) => print(`[${new Date().toISOString()}] ${message}`);
    return {
      logInfo: (msg) => log(`INFO: ${msg}`),
      logError: (msg) => log(`ERROR: ${msg}`)
    };
  })();
}

const resources = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

(async () => {
  const resourceLoader = new AsyncResourceLoader(resources);

  try {
    AsyncResourceLoader.logger.logInfo('Starting resource fetch');
    const data = await resourceLoader.fetchResources();
    AsyncResourceLoader.logger.logInfo('Resources fetched successfully');
    console.table(data);
  } catch (error) {
    AsyncResourceLoader.logger.logError(error.message);
  }
})();
