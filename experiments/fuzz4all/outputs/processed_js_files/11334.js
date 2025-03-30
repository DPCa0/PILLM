class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  #privateProperty = 'This is private';
  
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    print(`${this.name} barks.`);
  }

  static description() {
    return 'Dogs are domesticated mammals, not natural wild animals.';
  }

  get info() {
    return `${this.name} is a ${this.breed}`;
  }

  async *barkGenerator() {
    let i = 0;
    while (i < 3) {
      yield await new Promise(resolve => setTimeout(() => resolve(`${this.name} barks.`), 1000));
      i++;
    }
  }

  logPrivateProperty() {
    print(this.#privateProperty);
  }
}

const bulldog = new Dog('Buddy', 'Bulldog');
bulldog.speak();

print(Dog.description());
print(bulldog.info);

(async function() {
  const barkGen = bulldog.barkGenerator();
  for await (const bark of barkGen) {
    print(bark);
  }
})();

bulldog.logPrivateProperty();

const proxy = new Proxy(bulldog, {
  get(target, property) {
    if (property === 'breed') {
      return `The breed is classified.`;
    }
    return Reflect.get(target, property);
  }
});

print(proxy.breed);
print(proxy.name);

const multiply = (x, y) => x * y;
const cachedMultiply = new Proxy(multiply, {
  apply(target, thisArg, args) {
    const [x, y] = args;
    print(`Multiplying ${x} and ${y}`);
    return Reflect.apply(target, thisArg, args);
  }
});

print(cachedMultiply(3, 7));
