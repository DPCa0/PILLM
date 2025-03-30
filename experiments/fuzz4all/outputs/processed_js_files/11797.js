 
class Person {
  #age;  

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  greet() {
    print(`Hello, my name is ${this.name}.`);
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (value < 0) throw new Error('Age cannot be negative.');
    this.#age = value;
  }

   
  static compare(person1, person2) {
    return person1.age - person2.age;
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

 
const person = new Person('Alice', 25);
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' accessed.`);
    return Reflect.get(...arguments);
  },
};

const proxiedPerson = new Proxy(person, handler);

 
proxiedPerson.greet();
proxiedPerson.age = 26;
print(`New age: ${proxiedPerson.age}`);

print(`Generated ID: ${ids.next().value}`);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
