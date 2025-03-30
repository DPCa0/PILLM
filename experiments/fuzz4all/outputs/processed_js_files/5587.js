 
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a sound.`);
  }
}

 
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    print(`${this.name}, the ${this.breed}, barks!`);
  }
}

 
const isTrainedSymbol = Symbol('isTrained');

 
function trainDog(dog) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (dog instanceof Dog) {
        dog[isTrainedSymbol] = true;
        resolve(`${dog.name} is trained!`);
      } else {
        reject('This is not a dog!');
      }
    }, 2000);
  });
}

 
async function initiateTraining(dog) {
  try {
    const message = await trainDog(dog);
    print(message);
  } catch (error) {
    print(error);
  }
}

 
const myDog = new Dog('Buddy', 'Golden Retriever');

 
const dogProxy = new Proxy(myDog, {
  get(target, prop) {
    if (prop === isTrainedSymbol) {
      return target[prop] ? 'Yes, trained' : 'Not yet trained';
    }
    return target[prop];
  }
});

 
myDog.speak();
initiateTraining(dogProxy);
setTimeout(() => {
  print(`Is ${myDog.name} trained? ${dogProxy[isTrainedSymbol]}`);
}, 3000);
