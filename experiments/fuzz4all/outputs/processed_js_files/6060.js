class Person {
  #name;  
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    if (typeof newName === 'string') {
      this.#name = newName;
    }
  }

  static fromJSON(json) {
    const data = JSON.parse(json);
    return new Person(data.name, data.age);
  }

  *ageGenerator() {
    let currentAge = this.age;
    while (true) {
      yield currentAge++;
    }
  }

  async birthday() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.age += 1;
        resolve(`Happy ${this.age}th Birthday, ${this.#name}!`);
      }, 1000);
    });
  }
}

(async () => {
  const person = Person.fromJSON('{"name": "Alice", "age": 30}');
  print(`Hello, ${person.name}! You are ${person.age} years old.`);

  const ageIterator = person.ageGenerator();
  print(`Next year you'll be ${ageIterator.next().value}.`);
  print(`The year after, you'll be ${ageIterator.next().value}.`);

  print(await person.birthday());
})();
