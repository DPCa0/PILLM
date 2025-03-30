(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);

  class Person {
    constructor(name) {
      this.name = name;
    }

    sayHello = () => print(`Hello, my name is ${this.name}`);
  }

  const processArray = async (array) => {
    for await (const item of array) {
      await delay(100);
      print(`Processing: ${item}`);
    }
  }

  const numbers = new Proxy([1, 2, 3, 4, 5], {
    get(target, prop) {
      if (prop === 'sum') {
        return target.reduce((a, b) => a + b, 0);
      }
      return Reflect.get(...arguments);
    }
  });

  const main = async () => {
    const john = new Person('John Doe');
    john.sayHello();

    print('Factorial of 5:', factorial(5));
    print('Sum of numbers:', numbers.sum);

    const arrayToProcess = ['apple', 'banana', 'cherry'];
    await processArray(arrayToProcess);

    const json = `{"name": "John", "age": 30}`;
    const parsed = JSON.parse(json);
    print('Destructured Name:', (({name}) => name)(parsed));
  };

  main();
})();
