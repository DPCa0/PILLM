class Animal {
  #name;  

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  speak() {
    print(`${this.#name} makes a noise.`);
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

 
const createAnimalNoiseMaker = (AnimalType) => {
  return (name) => {
    const animal = new AnimalType(name);
    animal.speak();
  };
};

 
const makeNoise = async (makeNoiseFunc, name) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      makeNoiseFunc(name);
      resolve();
    }, 1000);
  });
};

(async () => {
  const makeDogNoise = createAnimalNoiseMaker(Dog);
  await makeNoise(makeDogNoise, "Buddy");

  const animals = [new Dog("Max"), new Dog("Bella")];
   
  const animalMap = new Map();
  const animalSet = new Set();

  for (const animal of animals) {
    animalMap.set(animal.name, animal);
    animalSet.add(animal.name);
  }

  print("Animal Names in Map:");
  animalMap.forEach((animal, name) => {
    print(name);
  });

  print("Animal Names in Set:");
  for (const name of animalSet) {
    print(name);
  }
})();
