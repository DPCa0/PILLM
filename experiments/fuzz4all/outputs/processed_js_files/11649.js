 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
class AdvancedCounter {
  #count = 0;
  static instances = 0;

  constructor() {
    AdvancedCounter.instances++;
  }

  increment() {
    this.#count++;
  }

  getCount() {
    return this.#count;
  }

  *generator() {
    while (true) {
      yield this.#count++;
    }
  }

  static totalInstances() {
    return `Total instances created: ${this.instances}`;
  }
}

 
async function main() {
  const counter1 = new AdvancedCounter();
  const counter2 = new AdvancedCounter();

  print(AdvancedCounter.totalInstances());

  counter1.increment();
  counter2.increment();
  counter2.increment();

  const gen = counter1.generator();

  print(`Counter1 count: ${counter1.getCount()}`);
  print(`Counter2 count: ${counter2.getCount()}`);
  print(`Next generator value: ${gen.next().value}`);
  
  await delay(1000);
  
  print(`Next generator value after delay: ${gen.next().value}`);
}

 
(async () => {
  print('Program started');
  await main();
  print('Program ended');
})();
