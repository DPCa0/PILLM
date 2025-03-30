Certainly! Below is a JavaScript program that utilizes advanced features such as asynchronous functions, Promises, destructuring, rest/spread operators, and classes with inheritance.

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} the ${this.breed} barks.`;
  }
}

const getDogPromise = (name, breed) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name && breed) {
        resolve(new Dog(name, breed));
      } else {
        reject(new Error('Invalid Dog details'));
      }
    }, 1000);
  });
};

async function dogShowcase() {
  try {
    const dogDetails = { name: "Buddy", breed: "Golden Retriever" };
    const { name, breed } = dogDetails;
    const dog = await getDogPromise(name, breed);
    print(dog.speak());
  } catch (error) {
    console.error(error);
  }
}

dogShowcase();

const showcaseAnimals = (...animalNames) => {
  const animals = animalNames.map(name => new Animal(name));
  animals.forEach(animal => {
    print(animal.speak());
  });
};

showcaseAnimals('Cat', 'Cow', 'Duck');

This code demonstrates the creation of `Animal` and `Dog` classes, use of asynchronous operations with `async/await`, error handling with Promises, and advanced object and array manipulation techniques.