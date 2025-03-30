 
async function fetchData(url) {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
}

 
async function* dataStream(urls) {
  for (const url of urls) {
    const result = await fetchData(url);
    yield result.data;
  }
}

 
class DataManager {
  static #cache = new Map();

  constructor(name) {
    this.name = name;
  }

  static async fetchAndCacheData(urls) {
    const data = [];
    const stream = dataStream(urls);

    for await (const item of stream) {
      this.#cache.set(item, true);
      data.push(item);
    }

    return data;
  }

  static getCachedData() {
    return Array.from(this.#cache.keys());
  }
}

 
(async () => {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
  const dataManager = new DataManager('ExampleManager');

  print(`Fetching and caching data using ${dataManager.name}...`);

  const data = await DataManager.fetchAndCacheData(urls);
  print('Fetched Data:', data);

  print('Cached Data:', DataManager.getCachedData());
})();
