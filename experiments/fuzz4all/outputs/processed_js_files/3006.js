class ComplexFeatureExample {
  static #privateStaticField = 'Private';

  constructor(value) {
    this.publicField = value;
    this.#privateField = Math.random();
  }

  #privateMethod() {
    return this.#privateField;
  }

  static *staticGeneratorFunction(n) {
    for (let i = 0; i < n; i++) {
      yield `${ComplexFeatureExample.#privateStaticField}-${i}`;
    }
  }

  async #privateAsyncMethod() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.publicField.toUpperCase()), 1000);
    });
  }

  async publicAsyncMethod() {
    const result = await this.#privateAsyncMethod();
    print(`Async Result: ${result}`);
  }

  get getterWithSideEffect() {
    print('Getter called');
    return this.#privateMethod();
  }

  static async #fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }

  static async main() {
    print('Complex Feature Example:');

     
    try {
      const data = await ComplexFeatureExample.#fetchData('https://jsonplaceholder.typicode.com/todos/1');
      print('Fetched Data:', data);
    } catch (error) {
      console.error('Fetch error:', error);
    }

     
    const instance = new ComplexFeatureExample('hello');
    print('Getter Value:', instance.getterWithSideEffect);

     
    await instance.publicAsyncMethod();

     
    const generator = ComplexFeatureExample.staticGeneratorFunction(3);
    for (const value of generator) {
      print('Generated Value:', value);
    }

     
    const handler = {
      get(target, prop, receiver) {
        print(`Accessing ${String(prop)} of `, target);
        return Reflect.get(target, prop, receiver);
      }
    };

    const proxiedInstance = new Proxy(instance, handler);
    print('Proxied Access:', proxiedInstance.publicField);
  }
}

ComplexFeatureExample.main();
