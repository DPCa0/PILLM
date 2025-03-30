class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    print(`${this.name} barks.`);
  }

  async fetchBall() {
    const ball = await Promise.resolve('Ball');
    print(`${this.name} fetched the ${ball}!`);
  }
}

const createAnimalProxy = (animal) => {
  return new Proxy(animal, {
    get(target, prop, receiver) {
      if (typeof target[prop] === 'function') {
        print(`Calling method: ${prop}`);
        return (...args) => {
          console.time(`${prop} execution time`);
          const result = Reflect.apply(target[prop], receiver, args);
          console.timeEnd(`${prop} execution time`);
          return result;
        };
      }
      return Reflect.get(target, prop, receiver);
    }
  });
};

const randomAnimalFactory = () => {
  const names = ['Rex', 'Milo', 'Buddy'];
  const breeds = ['Labrador', 'Beagle', 'Bulldog'];
  const randomIndex = () => Math.floor(Math.random() * 3);
  
  return new Dog(names[randomIndex()], breeds[randomIndex()]);
};

const myDog = createAnimalProxy(randomAnimalFactory());
myDog.speak();
myDog.fetchBall();

const someSet = new Set([1, 2, 3, 4]);
const doubled = Array.from(someSet).map(x => x * 2);

for (const num of doubled) {
  print(`Doubled value: ${num}`);
}
