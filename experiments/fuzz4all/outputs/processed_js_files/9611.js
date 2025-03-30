class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    print(`${this.name} barks.`);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const createAnimalWithDelay = async (name) => {
  await delay(1000);
  return new Dog(name);
};

(async () => {
  const dog = await createAnimalWithDelay('Rex');
  dog.speak();  

  const ids = [1, 2, 3, 4];
  const users = await Promise.all(
    ids.map(async id => {
      const response = await fetch(`https: 
      return response.json();
    })
  );

  users.forEach(user => print(user.name));

  const squareRoot = (x) => x < 0 ? NaN : Math.sqrt(x);
  const proxy = new Proxy(squareRoot, {
    apply: (target, thisArg, argumentsList) => {
      print(`Calculating the square root of ${argumentsList[0]}`);
      return Reflect.apply(target, thisArg, argumentsList);
    }
  });

  print(proxy(9));
  print(proxy(-1));
})();
