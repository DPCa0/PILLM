 
class Person {
  #age;  

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

   
  static compareAge(person1, person2) {
    return person1.#age - person2.#age;
  }

   
  getAge() {
    return this.#age;
  }

   
  async celebrateBirthday() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#age++;
        resolve(`Happy ${this.#age}th Birthday, ${this.name}!`);
      }, 1000);
    });
  }
}

 
function introducePeople(...people) {
  people.forEach(({ name, age }) => {
    print(`Hello, my name is ${name} and I am ${age} years old.`);
  });
}

 
const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

 
async function celebrateAll() {
  const messages = await Promise.all([alice.celebrateBirthday(), bob.celebrateBirthday()]);
  messages.forEach((message) => print(message));
}

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<strong>${values[i] || ''}</strong>`, '');
}

const message = highlight`Comparing ages: ${Person.compareAge(alice, bob)} is the difference between them.`;

 
print(message);
introducePeople({ name: 'Alice', age: alice.getAge() }, { name: 'Bob', age: bob.getAge() });
celebrateAll();
