 
const complexFunction = (arr) => {
   
  const [first, second, ...rest] = arr;

   
  const map = new Map();
  const set = new Set(arr);
  const sym = Symbol("unique");

   
  class Base {
    constructor(name) {
      this.name = name;
    }
    describe() {
      return `This is ${this.name}`;
    }
  }

  class Derived extends Base {
    constructor(name, version) {
      super(name);
      this.version = version;
    }
    info() {
      return `${super.describe()} version ${this.version}`;
    }
  }

   
  const describeItem = (item) => `Item: ${item}`;

   
  const asyncOperation = async (item) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Processed ${item}`);
      }, 1000);
    });
  };

  const processItems = async () => {
    for (let item of set) {
      map.set(item, await asyncOperation(item));
    }
  };

   
  const targetObject = {
    [sym]: "symbol value"
  };

  const handler = {
    get: (target, prop) => {
      print(`Accessing property: ${prop}`);
      return target[prop];
    }
  };

  const proxiedObject = new Proxy(targetObject, handler);

   
  const tag = (strings, ...values) => {
    return strings.reduce((acc, str, index) => {
      return `${acc}${str}${values[index] ? values[index].toUpperCase() : ""}`;
    }, "");
  };

   
  (async () => {
    print(tag`Handling items: ${describeItem(first)}, ${describeItem(second)}`);
    const derived = new Derived("Complex System", "2.0");
    print(derived.info());
    await processItems();
    print("Results Map:", map);
    print("Proxied access:", proxiedObject[sym]);
  })();
};

 
complexFunction(["apple", "banana", "cherry", "date", "elder