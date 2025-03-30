 
class Person {
  #name;
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

   
  static isAdult(age) {
    return age >= 18;
  }

   
  getName() {
    return this.#name;
  }

   
  setName(name) {
    this.#name = name;
  }

   
  async getBio() {
    const response = await fetch(`https: 
    const data = await response.json();
    return `${this.getName()} is ${this.age} years old and is considered ${data.status}`;
  }
}

 
function logExecution(func) {
  return function (...args) {
    print(`Executing function ${func.name} with arguments: ${args}`);
    return func(...args);
  };
}

 
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const personProxy = new Proxy(new Person('Alice', 30), handler);

 
const isAdultLogged = logExecution(Person.isAdult);
print(isAdultLogged(personProxy.age));  

personProxy.setName('Bob');
print(personProxy.getName());

 
personProxy.getBio().then(console.log);
