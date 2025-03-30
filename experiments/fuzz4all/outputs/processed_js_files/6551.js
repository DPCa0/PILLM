class Person {
  #privateAge;
  constructor(name, age) {
    this.name = name;
    this.#privateAge = age;
  }

  get age() {
    return this.#privateAge;
  }

  set age(newAge) {
    if (newAge > 0) {
      this.#privateAge = newAge;
    } else {
      console.error('Invalid age');
    }
  }

  static fromJSON(json) {
    const { name, age } = JSON.parse(json);
    return new Person(name, age);
  }

  *hobbiesGenerator() {
    for (const hobby of this.hobbies) {
      yield hobby;
    }
  }

  async asyncGetGreeting() {
    const greeting = await new Promise((resolve) => 
      setTimeout(() => resolve(`Hello, my name is ${this.name}.`), 1000)
    );
    return greeting;
  }
}

(async () => {
  const john = new Person('John Doe', 30);
  john.hobbies = ['Reading', 'Cycling', 'Hiking'];
  
  print(await john.asyncGetGreeting());

  for (const hobby of john.hobbiesGenerator()) {
    print(`I like ${hobby}.`);
  }

  const jsonStr = '{"name":"Jane Doe","age":25}';
  const jane = Person.fromJSON(jsonStr);
  print(`Created person from JSON: ${jane.name}, ${jane.age}`);

  jane.age = 26;
  print(`Updated age: ${jane.age}`);
})();
