class Animal {
  constructor(name) {
    this.name = name;
  }
  
  sound() {
    print(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  sound() {
    super.sound();
    print(`${this.name} barks!`);
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
  
  sound() {
    super.sound();
    print(`${this.name} meows!`);
  }
}

function* animalGenerator() {
  yield new Dog('Rex', 'Golden Retriever');
  yield new Cat('Whiskers', 'Tabby');
  yield new Dog('Fido', 'Bulldog');
}

const handler = {
  get(target, property) {
    return property in target ? target[property] : 'Property does not exist';
  }
};

const dogProxy = new Proxy(new Dog('Buddy', 'Labrador'), handler);

const animals = [...animalGenerator()];

const asyncSound = async (animals) => {
  for (let animal of animals) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    animal.sound();
  }
};

print(dogProxy.name);  
print(dogProxy.breed);  
print(dogProxy.color);  

asyncSound(animals);
