class Person {
  #name;
  #age;
  
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }
  
  getName() {
    return this.#name;
  }
  
  async celebrateBirthday() {
    print(`Happy Birthday ${this.#name}!`);
    this.#age++;
    await this.#reflectOnLife();
  }
  
  async #reflectOnLife() {
    return new Promise(resolve => {
      setTimeout(() => {
        print(`${this.#name} has a profound realization.`);
        resolve();
      }, 1000);
    });
  }
}

const persons = [
  new Person('Alice', 30),
  new Person('Bob', 25)
];

(async () => {
  for await (const person of persons.map(p => p.celebrateBirthday())) {
    print(`${person.getName()} is now ${person.age} years old.`);
  }
})().catch(console.error);

const logPersonDetails = ({ getName }) => print(`Details: ${getName()}`);

logPersonDetails(persons[0]);
