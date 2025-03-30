class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  makeSound() {
    print(`${this.name} says ${this.sound}`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'woof');
    this.breed = breed;
  }

  fetch(item) {
    print(`${this.name} the ${this.breed} fetches a ${item}`);
  }
}

const createProxyHandler = () => ({
  get(target, property) {
    if (property in target) {
      print(`Getting property ${property}`);
      return target[property];
    } else {
      console.warn(`${property} not found`);
    }
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const myDog = new Dog('Buddy', 'Golden Retriever');
  const proxiedDog = new Proxy(myDog, createProxyHandler());

  proxiedDog.makeSound();
  proxiedDog.fetch('ball');
  
  await sleep(1000);  
  proxiedDog.name = 'Max';
  proxiedDog.makeSound();
})();
