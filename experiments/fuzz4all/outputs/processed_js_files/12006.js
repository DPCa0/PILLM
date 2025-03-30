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

  get info() {
    return `${this.name} is a ${this.breed}`;
  }

  static favoriteFood() {
    return 'bones';
  }
}

 
const getDogInfo = async (dog) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dog.info);
    }, 1000);
  });
};

 
const dogHandler = {
  get: (obj, prop) => {
    if (prop === 'speak') {
      print(`About to speak...`);
    }
    return obj[prop];
  }
};

(async () => {
  const myDog = new Dog('Buddy', 'Golden Retriever');
  const proxiedDog = new Proxy(myDog, dogHandler);

  print(`Favorite food: ${Dog.favoriteFood()}`);
  proxiedDog.speak();

  const info = await getDogInfo(proxiedDog);
  print(info);

   
  const dogs = [new Dog('Max', 'Beagle'), new Dog('Luna', 'Husky')];
  const names = dogs.map(d => d.name);
  const allDogs = [...dogs, proxiedDog];
  print('All dog names:', names);
  print('Number of dogs:', allDogs.length);
})();
