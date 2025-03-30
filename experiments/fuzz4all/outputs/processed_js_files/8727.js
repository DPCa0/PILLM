class Animal {
  #name;  
  constructor(name) {
    this.#name = name;
  }
  getName() {
    return this.#name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() {
    print(`Woof! My name is ${this.getName()} and I'm a ${this.breed}.`);
  }
}

// Asynchronous Generator Function
async function* fetchDogFacts() {
  const response = await fetch('https: 
  const data = await response.json();
  for (const fact of data.facts) {
    yield fact;
  }
}

 
const dog = new Dog('Buddy', 'Golden Retriever');
const handler = {
  get(target, prop) {
    if (prop === 'bark') {
      return function() {
        print('The dog is about to bark...');
        return target[prop]();
      }
    }
    return Reflect.get(target, prop);
  }
};

const proxiedDog = new Proxy(dog, handler);
proxiedDog.bark();

 
(async () => {
  const dogFacts = fetchDogFacts();
  print('Fetching dog facts:');
  for await (const fact of dogFacts) {
    print(fact);
  }
})();
