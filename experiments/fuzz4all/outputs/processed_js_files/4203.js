class Person {
  #name;  
  static #population = 0;  

  constructor(name, age) {
    this.#name = name;
    this.age = age;
    this.skills = [];
    Person.#population++;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  static get population() {
    return Person.#population;
  }

  addSkill(...newSkills) {
    this.skills = [...new Set([...this.skills, ...newSkills])];
  }

  async greet() {
    const greeting = await new Promise(resolve => 
      setTimeout(() => resolve(`Hello, my name is ${this.#name}.`), 1000)
    );
    print(greeting);
  }
}

 
function logMethod(target, key, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling "${key}" with arguments`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class Developer extends Person {
  constructor(name, age, primaryLanguage) {
    super(name, age);
    this.primaryLanguage = primaryLanguage;
  }

  @logMethod
  code(language) {
    if (this.skills.includes(language)) {
      print(`${this.#name} is coding in ${language}.`);
    } else {
      print(`${this.#name} needs to learn ${language} first.`);
    }
  }
}

(async function () {
  const dev = new Developer('Alice', 28, 'JavaScript');
  await dev.greet();
  dev.addSkill('JavaScript', 'Python');
  dev.code('JavaScript');
  dev.code('C++');
  print(`Current population: ${Developer.population}`);
})();
