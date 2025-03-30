 
class AdvancedFeature {
  #privateField = "I'm private!";

  constructor(name) {
    this.name = name;
  }

  #privateMethod() {
    return `Hello from a private method, ${this.name}`;
  }

  publicMethod() {
    print(this.#privateMethod());
  }

  static staticMethod() {
    print("This is a static method.");
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'name') {
      return `${target[prop]} (proxied)`;
    }
    return target[prop];
  }
};

const instance = new AdvancedFeature("JavaScript");
const proxiedInstance = new Proxy(instance, handler);

 
async function* fetchData() {
  const data = ["data1", "data2", "data3"];
  for (const item of data) {
    yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
  }
}

 
const uniqueKey = Symbol('unique');

 
const myMap = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
]);

const mapEntries = [...myMap.entries()];

 
(async () => {
  print(proxiedInstance.name);
  proxiedInstance.publicMethod();
  AdvancedFeature.staticMethod();
  
  for await (const value of fetchData()) {
    print(value);
  }

  const [first, ...rest] = mapEntries;
  print(first);
  print(rest);
  
  const dynamicObject = {
    [uniqueKey]: 'This is a unique value',
    normalKey: 'This is a normal value'
  };

  print(dynamicObject[uniqueKey]);
})();
