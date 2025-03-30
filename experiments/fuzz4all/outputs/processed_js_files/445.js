 
class Person {
  #name;  
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

   
  getName() {
    return this.#name;
  }

   
  static compareAges(person1, person2) {
    return person1.age - person2.age;
  }

   
  *ageGenerator() {
    let year = new Date().getFullYear();
    while (this.age < 100) {
      yield `In ${year++}, ${this.#name} is ${this.age++} years old.`;
    }
  }

   
  static createProxy(target) {
    return new Proxy(target, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        }
        console.warn(`Property ${prop} not found`);
        return null;
      }
    });
  }
}

 
async function fetchPersonData() {
  try {
    let response = await fetch('https://api.agify.io/?name=michael');
    let data = await response.json();
    print(`According to the API, the average age for the name Michael is ${data.age}`);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

 
const uniqueSym = Symbol('uniqueIdentifier');

const john = new Person('John', 25);
john[uniqueSym] = 'UniqueID12345';

 
const proxiedJohn = Person.createProxy(john);
print(proxiedJohn.getName());
print(proxiedJohn[uniqueSym]);
print(proxiedJohn.nonexistentProperty);

 
fetchPersonData();

 
const uniqueAges = new Set([25, 30, 25, 40]);
const agesArray = [...uniqueAges];
print(`Unique ages array: ${agesArray}`);

 
const ageGen = john.ageGenerator();
for (let yearInfo of ageGen) {
  if (john.age > 30) break;  