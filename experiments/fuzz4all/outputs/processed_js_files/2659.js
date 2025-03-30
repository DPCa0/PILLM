class ComplexFeatureDemo {
  #privateField = 'I am private!';
  static #staticPrivateField = 'Static Private Value';

  constructor(name) {
    this.name = name;
  }

  #privateMethod() {
    print(this.#privateField);
  }

  static #staticPrivateMethod() {
    print(ComplexFeatureDemo.#staticPrivateField);
  }

  *objectGenerator() {
    yield { id: 1, data: 'First' };
    yield { id: 2, data: 'Second' };
    yield { id: 3, data: 'Third' };
  }

  async asyncMethod() {
    try {
      const result = await this.asyncOperation();
      print(`Async operation result: ${result}`);
    } catch (error) {
      console.error('Error in async operation:', error);
    }
  }

  asyncOperation() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('Async success!'), 1000);
    });
  }

  processItems() {
    for (let item of this.objectGenerator()) {
      print(`Processing item: ${item.id} - ${item.data}`);
    }
  }

  demonstrate() {
    print(`Hello, ${this.name}!`);
    this.#privateMethod();
    ComplexFeatureDemo.#staticPrivateMethod();
    this.processItems();
    this.asyncMethod();
  }
}

const demo = new ComplexFeatureDemo('JavaScript Enthusiast');
demo.demonstrate();
