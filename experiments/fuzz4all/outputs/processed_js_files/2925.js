 
(async () => {
   
  const handler = {
    get(target, prop, receiver) {
      print(`Property "${prop}" accessed with value: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    }
  };

  const data = new Proxy({
    message: "Hello, Proxy!",
    count: 0
  }, handler);

   
  const map = new Map();
  map.set('key1', 'value1');
  map.set('key2', 'value2');

   
  function* generator() {
    yield data.message;
    yield* map.values();
  }

   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   
  for await (let value of generator()) {
    await delay(1000);  
    print(`Generated value: ${value}`);
  }

   
  class Counter {
    #count = 0;
    
    increment() {
      return ++this.#count;
    }

    decrement() {
      return --this.#count;
    }

    get value() {
      return this.#count;
    }
  }

  const counter = new Counter();
  print(`Initial Count: ${counter.value}`);
  print(`Incremented Count: ${counter.increment()}`);
  print(`Decremented Count: ${counter.decrement()}`);
})();
