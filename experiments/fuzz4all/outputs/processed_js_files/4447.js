 
const UNIQUE_KEY = Symbol('uniqueKey');

 
class ComplexStructure {
  #privateField = 'I am private';

  constructor(name) {
    this.name = name;
    this[UNIQUE_KEY] = Math.random();
  }

  showPrivateField() {
    print(this.#privateField);
  }

  static createWithRandomName() {
    const randomName = `Name_${Math.random().toString(36).substring(7)}`;
    return new this(randomName);
  }
}

 
const delayedDouble = (num) =>
  new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  },
};

const proxyObject = new Proxy(targetObject, handler);

 
async function* asyncGenerator(array) {
  for (const item of array) {
    yield await delayedDouble(item);
  }
}

 
(async () => {
  const instance = ComplexStructure.createWithRandomName();
  print(`Instance created with name: ${instance.name}`);

  instance.showPrivateField();

   
  print(proxyObject.a);
  print(proxyObject.b);

  print('Starting async iteration...');
  const numbers = [1, 2, 3];
  for await (let doubled of asyncGenerator(numbers)) {
    print(`Doubled value: ${doubled}`);
  }
})();
