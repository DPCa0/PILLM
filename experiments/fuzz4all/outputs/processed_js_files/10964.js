class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function complexFunction() {
   
  const target = { value: 42 };
  const handler = {
    get: (obj, prop) => {
      print(`Getting property ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, val) => {
      print(`Setting property ${prop} to ${val}`);
      obj[prop] = val;
      return true;
    },
  };
  const proxy = new Proxy(target, handler);

   
  function* numberGenerator() {
    yield* [1, 2, 3, 4, 5];
  }
  
  const deferred = new Deferred();

   
  async function asyncIterator() {
    const numbers = numberGenerator();
    for (const number of numbers) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      print(`Generator produced: ${number}`);
    }
    deferred.resolve("All numbers processed");
  }

  proxy.value = proxy.value * 2;  

  print(`Initial proxy value: ${proxy.value}`);
  
  asyncIterator();

   
  const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5, 5]);
  print("Unique numbers:", ...uniqueNumbers);

  return deferred.promise;
}

complexFunction().then((message) => print(message));
