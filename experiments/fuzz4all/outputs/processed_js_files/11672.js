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
}

function getAnimalSounds(...animals) {
  return animals.map(animal => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(animal.speak()), Math.random() * 1000);
    });
  });
}

(async function() {
  const dog = new Dog('Charlie', 'Labrador');
  const animals = [new Animal('Simba'), dog, new Animal('Tigger')];

   
  const [first, ...rest] = animals;

  print(`First animal: ${first.name}`);

   
  await Promise.all(getAnimalSounds(...rest));

   
  const promises = rest.map(async animal => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    print(`Async: ${animal.name}`);
  });

  await Promise.all(promises);
})();
