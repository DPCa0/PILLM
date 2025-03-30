 
class Person {
  #age;  

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

   
  #getAge() {
    return this.#age;
  }

   
  describe() {
    return `${this.name} is ${this.#getAge()} years old.`;
  }

   
  static compareAge(person1, person2) {
    return person1.#getAge() - person2.#getAge();
  }
}

 
const personHandler = {
  get: (target, prop, receiver) => {
    if (prop === 'name') {
      return Reflect.get(target, prop, receiver).toUpperCase();
    }
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    if (prop === 'name' && typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    return Reflect.set(target, prop, value);
  }
};

 
const john = new Person('John', 30);
const jane = new Person('Jane', 25);

 
const proxiedJohn = new Proxy(john, personHandler);
const proxiedJane = new Proxy(jane, personHandler);

 
const personMap = new Map();
personMap.set('john', proxiedJohn);
personMap.set('jane', proxiedJane);

 
const { name: johnName } = personMap.get('john');
const { name: janeName } = personMap.get('jane');
const combinedNames = [...johnName, ...janeName].join('');

 
print(proxiedJohn.describe());
print(proxiedJane.describe());
print(`Combined Names: ${combinedNames}`);
print(`Age Difference: ${Person.compareAge(john, jane)}`);

 
async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await response.json();
  print('Fetched Data:', data);
}

 
fetchData().catch(err => console.error('Fetch error:', err));