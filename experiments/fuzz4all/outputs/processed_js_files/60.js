 

class ComplexFeatureDemo {
  constructor() {
    this.data = new Map();
    this.initProxy();
  }

  initProxy() {
    this.data = new Proxy(this.data, {
      set: (target, key, value) => {
        print(`Setting value ${value} for key ${key}`);
        target.set(key, value);
        return true;
      },
      get: (target, key) => {
        const value = target.get(key);
        print(`Getting value ${value} for key ${key}`);
        return value;
      }
    });
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'JavaScript', type: 'Programming Language' });
      }, 1000);
    });
  }

  async processData() {
    const data = await this.fetchData();
    this.data['name'] = data.name;
    this.data['type'] = data.type;
  }

  showData() {
    print(`Data: ${this.data['name']} is a ${this.data['type']}.`);
  }
}

(async () => {
  const demo = new ComplexFeatureDemo();
  await demo.processData();
  demo.showData();
})();
