 
class AdvancedCounter {
  #count = 0;  
  static #counterInstances = 0;  

  constructor(initialValue = 0) {
    if (typeof initialValue !== 'number') {
      throw new TypeError('Initial value must be a number');
    }
    this.#count = initialValue;
    AdvancedCounter.#incrementInstanceCount();
  }

   
  static #incrementInstanceCount() {
    this.#counterInstances += 1;
  }

   
  static getCounterInstances() {
    return AdvancedCounter.#counterInstances;
  }

   
  #increment() {
    this.#count += 1;
  }

   
  async *countUpTo(limit) {
    while (this.#count < limit) {
      this.#increment();
      yield await Promise.resolve(this.#count);
    }
  }

   
  static createProxy(counterInstance) {
    return new Proxy(counterInstance, {
      get(target, prop) {
        if (prop in target) {
          return Reflect.get(target, prop);
        } else {
          console.warn(`Property "${prop}" does not exist on target`);
          return undefined;
        }
      },
    });
  }
}

(async () => {
   
  const counter = new AdvancedCounter(0);
  const proxiedCounter = AdvancedCounter.createProxy(counter);

   
  for await (let value of proxiedCounter.countUpTo(5)) {
    print(value);
  }

  print(`Instances created: ${AdvancedCounter.getCounterInstances()}`);
})();
