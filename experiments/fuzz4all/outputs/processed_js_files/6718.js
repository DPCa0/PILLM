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

  async #fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  async getRandomFact() {
    const data = await this.#fetchData('https://randomuser.me/api/');
    return data.results[0].email;
  }

  *ageGenerator() {
    let count = this.#age;
    while (true) {
      yield count++;
    }
  }

  static #processNames(...names) {
    return names.map(name => name.toUpperCase());
  }

  static getProcessedNames(...names) {
    return Person.#processNames(...names);
  }
}

(async () => {
  const john = new Person('John Doe', 25);

  print(john.getName());  
  print(john.getAge());   
  print(await john.getRandomFact());   

  const ageGen = john.ageGenerator();
  print(ageGen.next().value);  
  print(ageGen.next().value);  

  const processedNames = Person.getProcessedNames('alice', 'bob', 'charlie');
  print(processedNames);  
})();
