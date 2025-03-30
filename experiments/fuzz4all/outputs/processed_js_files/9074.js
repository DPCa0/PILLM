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

  getAge() {
    return this.#age;
  }

  setAge(age) {
    if (age > 0) this.#age = age;
  }

  async birthday() {
    this.#age++;
    return new Promise(resolve => setTimeout(() => resolve(this.#age), 1000));
  }

  toString() {
    return `Name: ${this.#name}, Age: ${this.#age}`;
  }
}

const people = new Proxy([], {
  get(target, property) {
    print(`Accessed index ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting index ${property} to ${value.toString()}`);
    target[property] = value;
    return true;
  }
});

(async () => {
  people.push(new Person('Alice', 30));
  people.push(new Person('Bob', 25));

  for (const person of people) {
    print(person.toString());
  }

  const bob = people[1];
  await bob.birthday();
  print(`After Bob's birthday: ${bob.toString()}`);
})();
