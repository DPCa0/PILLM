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
    super.speak();
    print(`${this.name} barks.`);
  }
}

const dog1 = new Dog('Rex', 'Golden Retriever');
dog1.speak();

 
const { name, breed } = dog1;
const dogInfo = { ...dog1, age: 5 };

print(`Name: ${name}, Breed: ${breed}`);
print(dogInfo);

 
const fetchDogData = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Fetched dog data'), 1000);
  });

  const result = await promise;
  print(result);
};

fetchDogData();

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'secret') {
      return 'This is a secret!';
    }
    return Reflect.get(...arguments);
  }
};

const proxyDog = new Proxy(dog1, handler);
print(proxyDog.secret);
