class Singleton {
  constructor(name) {
    if (!Singleton.instance) {
      this.name = name;
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  static getInstance(name) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(name);
    }
    return Singleton.instance;
  }

  getName() {
    return this.name;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const proxyHandler = {
    get: (target, property) => {
      if (property in target) {
        print(`Accessing property "${property}" with value: ${target[property]}`);
        return target[property];
      } else {
        console.warn(`Property "${property}" does not exist.`);
        return undefined;
      }
    }
  };

  const singletonProxy = new Proxy(Singleton.getInstance("AdvancedJS"), proxyHandler);

  print("Initial Name:", singletonProxy.getName());

  singletonProxy.someProperty = 42;  

  await delay(1000);
  print("Delayed Access to 'someProperty':", singletonProxy.someProperty);

  const asyncIterator = {
    counter: 0,
    async next() {
      await delay(500);
      if (this.counter < 5) {
        return { value: this.counter++, done: false };
      }
      return { done: true };
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };

  print("Async iteration:");
  for await (let num of asyncIterator) {
    print(num);
  }

  print("Singleton Name via Proxy:", singletonProxy.getName());
})();
