 

class ComplexSystem {
  constructor() {
    this.data = [];
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 1000);
    });
  }

  async initialize() {
    const data = await this.fetchData();
    this.data = data;
    print('Data fetched:', this.data);
  }

  processData(filterFn) {
    return this.data.filter(filterFn);
  }

  getDataProxy() {
    return new Proxy(this.data, {
      get: (target, property) => {
        if (property in target) {
          print(`Accessing element at index ${property}`);
          return target[property];
        } else {
          console.warn(`No such element at index ${property}`);
          return null;
        }
      },
    });
  }
}

function main() {
  (async () => {
    const system = new ComplexSystem();
    await system.initialize();
    
    const filteredData = system.processData((x) => x > 2);
    print('Filtered Data:', filteredData);

    const proxyData = system.getDataProxy();
    print('Proxy Access:', proxyData[2]);  
    print('Proxy Access:', proxyData[10]);  
  })();
}

main();
