class ComplexSystem {
  constructor() {
    this.data = new Map();
  }

   
  getDataProxy() {
    return new Proxy(this.data, {
      get: (target, prop) => {
        if (!target.has(prop)) {
          print(`Property "${prop}" does not exist. Creating with default value.`);
          target.set(prop, []);
        }
        return target.get(prop);
      },
      set: (target, prop, value) => {
        print(`Setting property "${prop}" to value "${value}"`);
        target.set(prop, value);
        return true;
      }
    });
  }

   
  *processData() {
    for (let [key, value] of this.data) {
      yield `${key}: ${value}`;
    }
  }

   
  async fetchData() {
    const simulateAsync = () => new Promise(resolve => setTimeout(() => resolve('Fetched Data'), 1000));
    print('Fetching data...');
    const data = await simulateAsync();
    this.data.set('asyncData', data);
    print('Data fetched and stored.');
  }

   
  mergeData(...newEntries) {
    print('Merging data...');
    this.data = new Map([...this.data, ...newEntries]);
  }
}

 
(async () => {
  const system = new ComplexSystem();
  const dataProxy = system.getDataProxy();

  dataProxy['example'] = [1, 2, 3];
  print(dataProxy['example']);
  print(dataProxy['nonExistentKey']);

  await system.fetchData();

  system.mergeData(['extraData', [4, 5, 6]]);
  print([...system.processData()]);
})();
