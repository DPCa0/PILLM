 
class AdvancedFeatures {
  constructor() {
    this.data = new Map();
  }

  setData(key, value) {
    this.data.set(key, value);
  }

  async fetchData(key) {
    const generator = this.dataGenerator(key);
    let result = generator.next();

    while (!result.done) {
      print(result.value);
      result = generator.next();
    }

    const value = await this.simulateAsyncOperation(key);
    return value;
  }

  *dataGenerator(key) {
    yield `Accessing key: ${key}`;
    yield `Value retrieval in progress...`;
  }

  simulateAsyncOperation(key) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Value for ${key} is: ${this.data.get(key)}`);
      }, 1000);
    });
  }
}

const advancedHandler = {
  get: function (obj, prop) {
    if (prop === 'fetchData') {
      print(`Intercepting call to: ${prop}`);
    }
    return obj[prop];
  },
};

const advanced = new Proxy(new AdvancedFeatures(), advancedHandler);
advanced.setData('name', 'JavaScript');
advanced.setData('year', 2023);

(async () => {
  const result = await advanced.fetchData('name');
  print(result);

  const result2 = await advanced.fetchData('year');
  print(result2);
})();
