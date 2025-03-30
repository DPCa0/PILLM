 
async function* fibonacciSequence(n) {
  let [prev, current] = [0, 1];
  while (n-- > 0) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(current), 500)
    );
    [prev, current] = [current, prev + current];
  }
}

 
const loggerHandler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const config = new Proxy({ maxIterations: 10 }, loggerHandler);

(async () => {
  print('Fibonacci Sequence:');
  for await (const num of fibonacciSequence(config.maxIterations)) {
    print(num);
  }
})();

 
const privateData = new WeakMap();

class Person {
  constructor(name) {
    privateData.set(this, { name });
  }

  getName() {
    return privateData.get(this).name;
  }
}

const alice = new Person('Alice');
print(`Name accessed from private storage: ${alice.getName()}`);

 
const numbers = [1, 2, 3, 2, 4, 5, 1, 6];
const uniqueNumbers = [...new Set(numbers)];
print('Unique numbers:', uniqueNumbers);
