class ComplexDataStructure {
  constructor(data) {
    this.data = new Map(Object.entries(data));
  }

  async *asyncIterator() {
    for (const [key, value] of this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield { key, value };
    }
  }

  static #privateStaticMethod() {
    return 'Accessed private static method!';
  }

  get #privateProperty() {
    return 'Accessed private property!';
  }

  getPrivateInfo() {
    return {
      privateProperty: this.#privateProperty,
      privateStaticMethod: ComplexDataStructure.#privateStaticMethod()
    };
  }
}

(async () => {
  const data = {
    apple: 1,
    banana: 2,
    cherry: 3
  };

  const complexObject = new ComplexDataStructure(data);

  print('Private Information:', complexObject.getPrivateInfo());

  print('Iterating asynchronously through the data structure:');
  for await (const item of complexObject.asyncIterator()) {
    print(`Key: ${item.key}, Value: ${item.value}`);
  }

  print('Creating a Proxy to log all accesses:');
  const handler = {
    get: (target, property) => {
      print(`Accessing property "${property}"`);
      return target[property];
    }
  };

  const proxiedObject = new Proxy(complexObject, handler);
  print(proxiedObject.getPrivateInfo());
})();
