 
const UNIQUE_KEY = Symbol('uniqueKey');

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === UNIQUE_KEY) {
      return 'Accessing unique property!';
    }
    const value = Reflect.get(target, prop, receiver);
    return typeof value === 'function' ? value.bind(target) : value;
  }
};

class AdvancedFeatureDemo {
  constructor() {
    this.data = {
      name: 'JavaScript',
      level: 'Advanced',
      features: ['Proxy', 'Symbol', 'Async/Await'],
      [UNIQUE_KEY]: 'Hidden feature',
    };
  }
  
  async simulateAsyncOperation() {
    return new Promise((resolve) => setTimeout(() => resolve('Operation Complete'), 1000));
  }
  
  async demonstrateFeatures() {
    print('--- Demostrating Advanced Features ---');
    const message = await this.simulateAsyncOperation();
    print(`Async/Await: ${message}`);
    print('Accessing Symbol property:', this.data[UNIQUE_KEY]);
  }
}

 
const demo = new Proxy(new AdvancedFeatureDemo(), handler);

 
demo.demonstrateFeatures();
