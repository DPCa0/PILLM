 

 
class Animal {
  static #animalCount = 0;
  #name;
  constructor(name) {
    this.#name = name;
    Animal.#animalCount++;
  }

  static getAnimalCount() {
    return Animal.#animalCount;
  }

  speak() {
    return `${this.#name} makes a noise.`;
  }
}

 
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    return `${super.speak()} Woof!`;
  }
}

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function getDogDetails(...dogs) {
  const [firstDog, ...restDogs] = dogs;
  
  for (const dog of [firstDog, ...restDogs]) {
    print(dog.speak());
    await delay(1000);  
  }
  
  print(`Total animals created: ${Animal.getAnimalCount()}`);
}

 
const buddy = new Dog('Buddy');
const max = new Dog('Max');
const luna = new Dog('Luna');

getDogDetails(buddy, max, luna);
