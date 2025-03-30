 
class AdvancedFeatureDemo {
  #privateField = 'Private Data';
  static staticProperty = 'Static Data';
  
  constructor() {
    this.instanceProperty = 'Instance Data';
  }

  #privateMethod() {
    print(`Accessing: ${this.#privateField}`);
  }

  static staticMethod() {
    print(`Accessing: ${this.staticProperty}`);
  }

  instanceMethod() {
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise Resolved');
      }, 1000);
    });

    examplePromise
      .then(data => {
        print(data);
        return new Promise(resolve => setTimeout(() => resolve('Chained Promise'), 1000));
      })
      .then(chainedData => {
        print(chainedData);
        this.#privateMethod();
      });
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'instanceProperty') {
      return Reflect.get(...arguments) + ' (Intercepted)';
    }
    return Reflect.get(...arguments);
  }
};

const instance = new Proxy(new AdvancedFeatureDemo(), handler);

 
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const [a, ...rest] = generatorFunction();
print(a, rest);

 
function tag(strings, ...values) {
  print(strings.raw[0], values[0]);
  return `Tagged: ${values[0]}`;
}

const taggedResult = tag`Hello ${instance.instanceProperty}`;

 
print(taggedResult);
AdvancedFeatureDemo.staticMethod();
instance.instanceMethod();
