 
class Person {
   
  #name;
  #age;

   
  static population = 0;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
    Person.population++;
  }

   
  greet = () => print(`Hello, my name is ${this.#name} and I am ${this.#age} years old.`);

   
  static getPopulation() {
    return Person.population;
  }
}

 
const personFactory = (function() {
  const names = ['Alice', 'Bob', 'Charlie', 'Dave'];
  const ages = [25, 30, 35, 40];
  let index = 0;

  return {
    createPerson: function() {
      if (index < names.length) {
        return new Person(names[index], ages[index++]);
      } else {
        throw new Error('No more people to create');
      }
    }
  };
})();

 
async function simulateAsync() {
  print('Starting async operation...');

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  await delay(1000);

  print('Async operation completed.');
}

 
(async function() {
  try {
    const person1 = personFactory.createPerson();
    person1.greet();

    const person2 = personFactory.createPerson();
    person2.greet();

    print(`Total population: ${Person.getPopulation()}`);

    await simulateAsync();
  } catch (error) {
    console.error(error.message);
  }
})();
