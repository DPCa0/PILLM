 
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

   
  static fromObject(obj) {
    return new Person(obj.name, obj.age);
  }

   
  greet() {
    print(`Hello, my name is ${this.#name}.`);
  }

   
  #isAdult() {
    return this.#age >= 18;
  }

   
  get ['status']() {
    return this.#isAdult() ? 'Adult' : 'Minor';
  }

   
  *getOlder() {
    while (this.#age < 100) {
      yield ++this.#age;
    }
  }
}

 
(async () => {
  const personObj = { name: 'Alice', age: 17 };
  const alice = Person.fromObject(personObj);

  alice.greet();
  print(`Current status: ${alice.status}`);

  print('Aging process:');
  for (let age of alice.getOlder()) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    print(`Age: ${age}`);
    if (age >= 18) break;  
  }
  
  print(`Final status: ${alice.status}`);
})();
