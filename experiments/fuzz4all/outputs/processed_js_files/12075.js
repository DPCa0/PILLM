 
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

   
  #validateAge(age) {
    return Number.isInteger(age) && age > 0;
  }

   
  introduce() {
    print(`Hello, my name is ${this.#name} and I am ${this.#age} years old.`);
  }

   
  static createAnonymous() {
    return new Person('Anonymous', Math.floor(Math.random() * 100));
  }

   
  get age() {
    return this.#age;
  }

  set age(newAge) {
    if (this.#validateAge(newAge)) {
      this.#age = newAge;
    } else {
      console.error('Invalid age');
    }
  }
}

 
async function fetchRandomNumber() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 1000);
  });
}

 
(async () => {
  const [person, randomNum] = [Person.createAnonymous(), await fetchRandomNumber()];
  print(`Random number fetched: ${randomNum}`);
  person.introduce();
})();

 
const fruits = new Map([
  ['apple', 1],
  ['banana', 2],
  ['cherry', 3],
]);

const uniqueFruits = new Set(['apple', 'banana', 'cherry', 'banana']);

fruits.forEach((value, key) => print(`${key} costs ${value}`));
print('Unique fruits:', ...uniqueFruits);

 
const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : 'Property does not exist';
  },
};

const proxyPerson = new Proxy(new Person('John Doe', 30), handler);
print(proxyPerson.name);  
print(proxyPerson.age);   
