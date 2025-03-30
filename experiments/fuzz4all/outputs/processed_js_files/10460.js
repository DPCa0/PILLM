class ComplexOperation {
  #privateField = 'This is private';

  constructor(data) {
    this.data = data;
    this.result = null;
  }

  *processData() {
    for (const item of this.data) {
      yield await this.#asyncOperation(item);
    }
  }

  async #asyncOperation(item) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(item * item), Math.random() * 1000)
    );
  }

  async execute() {
    this.result = [];
    for await (const processed of this.processData()) {
      this.result.push(processed);
      print(`Processed: ${processed}`);
    }
    return this.result;
  }

  getPrivate() {
    return this.#privateField;
  }

  static printClassInfo() {
    print('ComplexOperation performs async square operations on data');
  }
}

(async () => {
  ComplexOperation.printClassInfo();

  const data = [1, 2, 3, 4, 5];
  const operation = new ComplexOperation(data);

  const result = await operation.execute();
  print('Final Result:', result);

  print('Private Field:', operation.getPrivate());

  const complexObjProxy = new Proxy(operation, {
    get(target, prop) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    },
  });

  print('Access via Proxy:', complexObjProxy.result);
})();
