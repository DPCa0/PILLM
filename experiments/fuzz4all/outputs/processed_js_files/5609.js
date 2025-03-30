 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      print(`Property "${property}" does not exist, defaulting to "unknown"`);
      return 'unknown';
    }
  }
};

 
class DataManager {
  static #instances = 0;

  constructor(url) {
    this.url = url;
    DataManager.#instances += 1;
  }

  async #getData() {
    const data = await fetchData(this.url);
    print(`Fetched: ${data}`);
  }

  static getInstances() {
    return DataManager.#instances;
  }

  async load() {
    await this.#getData();
  }
}

 
function* createDataManagers(urls) {
  for (const url of urls) {
    yield new DataManager(url);
  }
}

 
const proxy = new Proxy({ apiUrl: 'http://example.com/api' }, handler);

 
const urls = ['http://example.com/1', 'http://example.com/2'];
const managerGenerator = createDataManagers(urls);

for (const manager of managerGenerator) {
  manager.load();
}

 
print(`API URL: ${proxy.apiUrl}`);
print(`Non-existent Property: ${proxy.someProperty}`);

 
print(`Instances created: ${DataManager.getInstances()}`);
