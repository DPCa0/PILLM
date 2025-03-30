 

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

   
  static isDog(obj) {
    return obj instanceof Dog;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} of ${target.name}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} of ${target.name} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

let myDog = new Dog('Buddy', 'Golden Retriever');

 
const proxyDog = new Proxy(myDog, handler);

proxyDog.speak();
proxyDog.name = 'Max';
proxyDog.speak();

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    print(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();

 
const { name, breed, ...rest } = proxyDog;
print(`Dog's name is ${name} and breed is ${breed}`);
const newDogDetails = { ...rest, age: 3 };
print(newDogDetails);
