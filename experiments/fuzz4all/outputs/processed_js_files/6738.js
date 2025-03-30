 
class Person {
  #firstName;
  #lastName;
  #age;
  
  constructor(firstName, lastName, age) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
  }

   
  #getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

   
  get info() {
    return `${this.#getFullName()} is ${this.#age} years old.`;
  }

   
  static async delayMessage(ms, message) {
    return new Promise(resolve => setTimeout(() => resolve(message), ms));
  }
}

 
(async () => {
  const person = new Person("John", "Doe", 30);

  print(person.info);  

  const delayedMessage = await Person.delayMessage(1000, "Hello, async world!");
  print(delayedMessage);  
})();

 
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler = {
  get(target, prop, receiver) {
    return prop in target ? target[prop] : `No such property: ${prop}`;
  },
};

const proxy = new Proxy(target, handler);
print(proxy.message1);  
print(proxy.message3);  

 
const map = new Map();
const set = new Set();
const sym = Symbol("unique");

map.set("key", "value");
set.add(1);

print(map.get("key"));  
print(set.has(1));  
print(Symbol.for("unique") === sym);  
