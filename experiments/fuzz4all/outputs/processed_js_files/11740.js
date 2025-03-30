 

class DataManager {
  constructor() {
    this.data = {};
  }

  fetchData(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.data[key] = Math.random() * 100;
        resolve(this.data[key]);
      }, 1000);
    });
  }

  async getData(key) {
    if (!(key in this.data)) {
      await this.fetchData(key);
    }
    return this.data[key];
  }
}

const manager = new DataManager();

(async function() {
  const keys = ['alpha', 'beta', 'gamma'];
  
   
  const [alpha, beta, gamma] = await Promise.all(keys.map(key => manager.getData(key)));
  
   
  const createLogger = (key) => (value) => print(`Value of ${key}: ${value}`);
  
  keys.forEach((key, index) => {
    const logger = createLogger(key);
    logger([alpha, beta, gamma][index]);
  });
})();
