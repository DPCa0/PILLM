 

class DataStore {
  constructor() {
    this.data = new Map();
    this.accessLogs = new Set();
  }
  
  async fetchData(key) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Value for ${key}`);
      }, 1000);
    });
  }
  
  async getData(key) {
    this.accessLogs.add(`Accessed key: ${key} at ${new Date().toISOString()}`);
    if (!this.data.has(key)) {
      this.data.set(key, await this.fetchData(key));
    }
    return this.data.get(key);
  }

  getLogs() {
    return Array.from(this.accessLogs);
  }
}

const handler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return async (...args) => {
        print(`Calling ${property} with arguments: ${args.join(', ')}`);
        const result = await target[property](...args);
        print(`Result of ${property}: ${result}`);
        return result;
      };
    }
    return target[property];
  },
};

const dataStore = new DataStore();
const proxyDataStore = new Proxy(dataStore, handler);

(async () => {
  print('Fetching data...');
  print(await proxyDataStore.getData('user1'));  
  print(await proxyDataStore.getData('user1'));  
  
  print('Access logs:');
  print(proxyDataStore.getLogs());  
})();
