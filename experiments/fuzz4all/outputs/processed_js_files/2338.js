 

class ComplexSystem {
  constructor() {
    this.data = new Set();
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['apple', 'banana', 'cherry']);
      }, 1000);
    });
  }

  async initialize() {
    const fruits = await this.fetchData();
    fruits.forEach((fruit) => this.data.add(fruit));
    print('Data initialized:', [...this.data]);
  }

  manipulateData(operation, value) {
    if (operation === 'add') {
      this.data.add(value);
    } else if (operation === 'delete') {
      this.data.delete(value);
    } else {
      print('Unknown operation');
    }
  }
}

 
const systemHandler = {
  get(target, prop, receiver) {
    print(`Accessing ${prop} property`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} property to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

(async () => {
  const system = new ComplexSystem();
  const proxiedSystem = new Proxy(system, systemHandler);

  await proxiedSystem.initialize();
  proxiedSystem.manipulateData('add', 'date');
  proxiedSystem.manipulateData('delete', 'banana');

  print('Final Data:', [...proxiedSystem.data]);
})();
