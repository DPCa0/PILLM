 

class AdvancedFeatureDemo {
  constructor() {
    this.data = new Map();
    this.proxyData = new Proxy(this.data, this.handler());
  }

  handler() {
    return {
      get: (target, prop) => {
        print(`Accessing ${prop} property`);
        return prop in target ? target[prop] : undefined;
      },
      set: (target, prop, value) => {
        print(`Setting ${prop} property to ${value}`);
        target[prop] = value;
        return true;
      }
    };
  }

  async fetchData(key) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = `Value for ${key}`;
        this.proxyData.set(key, value);
        resolve(value);
      }, 1000);
    });
  }

  async runDemo() {
     
    print("Fetching data...");
    const result = await this.fetchData("sampleKey");
    print(`Data fetched: ${result}`);
    print(`Accessing stored data: ${this.proxyData.get("sampleKey")}`);
  }
}

const demo = new AdvancedFeatureDemo();
demo.runDemo();
