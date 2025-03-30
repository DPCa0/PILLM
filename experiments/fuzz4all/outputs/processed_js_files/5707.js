class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get details() {
    return `${this.name}, Age: ${this.age}`;
  }
  
  #privateMethod() {
    print('This is a private method.');
  }

  static *ageGenerator() {
    let age = 0;
    while (true) {
      yield age++;
    }
  }

  async celebrateBirthday() {
    const newAge = await new Promise(resolve => setTimeout(() => resolve(this.age + 1), 1000));
    this.age = newAge;
    print(`Happy birthday ${this.name}! You are now ${this.age}.`);
    this.#privateMethod();
  }
}

const johndoe = new Person('John Doe', 29);
print(johndoe.details);

const ageGen = Person.ageGenerator();
print(`Generated age: ${ageGen.next().value}`);

(async () => {
  await johndoe.celebrateBirthday();
})();
