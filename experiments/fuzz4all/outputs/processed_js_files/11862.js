 
class AdvancedFeatures {
  #privateField = 'Secret Message';

  static #staticPrivateMethod() {
    return 'This is a static private method';
  }

  constructor() {
    this.dynamicValue = Math.random();
  }

  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  *generateSequence(end) {
    for (let i = 0; i < end; i++) {
      yield i * this.dynamicValue;
    }
  }

  showPrivate() {
    print(this.#privateField);
    print(AdvancedFeatures.#staticPrivateMethod());
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'dynamicValue') {
      return Reflect.get(target, prop, receiver) * 2;
    }
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    if (prop === 'dynamicValue') {
      print(`Setting dynamicValue: ${value}`);
      return Reflect.set(target, prop, value);
    }
    return false;
  }
};

const instance = new Proxy(new AdvancedFeatures(), handler);

 
(async () => {
  print('Fetching data asynchronously...');
  const data = await instance.fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', data);

  instance.showPrivate();

  print('Generated sequence:');
  for (const value of instance.generateSequence(5)) {
    print(value);
  }
})();
