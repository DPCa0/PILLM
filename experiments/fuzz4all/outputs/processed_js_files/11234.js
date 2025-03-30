class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

const proxyHandler = {
  get: function(target, property) {
    if (property in target) {
      return target[property];
    } else {
      print(`Property '${property}' doesn't exist.`);
    }
  },
};

const dog = new Dog('Rex');
const proxyDog = new Proxy(dog, proxyHandler);

const asyncExample = async () => {
  const delayedMessage = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Hello from the future!'), 1000);
  });

  const message = await delayedMessage;
  print(message);
};

const iterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const value of iterable) {
  print(value);
}

proxyDog.speak();
proxyDog.fly;   

(async () => {
  await asyncExample();
})();

print([...iterable]);   
