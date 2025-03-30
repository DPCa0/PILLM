 
(async () => {
  const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');

   
  const handler = {
    get(target, prop, receiver) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      print(`Setting property ${prop} to ${value}`);
      return Reflect.set(target, prop, value, receiver);
    }
  };

  const data = new Proxy({ values: [1, 2, 3] }, handler);

   
  data.values = _.shuffle(data.values);
  print(data.values);

   
  async function* asyncGenerator() {
    let i = 0;
    while (i < 5) {
      yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
  }

   
  for await (let num of asyncGenerator()) {
    print(`Async generated number: ${num}`);
  }

   
  class Person {
    #name;
    constructor(name) {
      this.#name = name;
    }
    greet() {
      print(`Hello, my name is ${this.#name}`);
    }
  }

  const john = new Person('John Doe');
  john.greet();
})();
