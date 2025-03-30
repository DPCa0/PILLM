 
(async () => {
   
  const uniqueKey = Symbol('unique');

   
  class AdvancedFeature {
    #privateProperty;
    
    constructor(value) {
      this.#privateProperty = value;
    }

    #privateMethod() {
      return `Private: ${this.#privateProperty}`;
    }

    publicMethod() {
      return `Public: ${this.#privateProperty}`;
    }

    getPrivateMessage() {
      return this.#privateMethod();
    }

    [uniqueKey]() {
      return "This is a symbol keyed method";
    }
  }

   
  const handler = {
    get: (target, property, receiver) => {
      print(`Getting ${property.toString()}`);
      return Reflect.get(target, property, receiver);
    }
  };

  const advancedInstance = new AdvancedFeature('Secret Value');
  const proxiedInstance = new Proxy(advancedInstance, handler);

   
  async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
  }

   
  print("Async Iterator Results:");
  for await (let num of asyncGenerator()) {
    print(num);
  }

   
  print(proxiedInstance.publicMethod());
  print(proxiedInstance.getPrivateMessage());
  print(proxiedInstance[uniqueKey]());

   
  const promises = [
    Promise.resolve('First'),
    Promise.reject('Error'),
    Promise.resolve('Third'),
  ];

  const results = await Promise.allSettled(promises);
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print(`Fulfilled: ${result.value}`);
    } else {
      print(`Rejected: ${result.reason}`);
    }
  });
})();
