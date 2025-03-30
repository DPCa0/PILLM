 
class Person {
  #age;  

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  static species() {
    return 'Homo sapiens';
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (value > 0) {
      this.#age = value;
    } else {
      throw new Error('Age must be positive');
    }
  }

  greet() {
    return `Hello, my name is ${this.name} and I am ${this.#age} years old.`;
  }
}

 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

 
(async () => {
  try {
     
    const { name, age } = { name: 'Alice', age: 30 };
    const person = new Person(name, age);

     
    print(`${person.greet()} I belong to the ${Person.species()} species.`);

     
    function* numberGenerator() {
      let num = 0;
      while (true) {
        yield num++;
      }
    }

    const gen = numberGenerator();
    print(gen.next().value);  
    print(gen.next().value);  

     
    const data = await fetchData('https://api.chucknorris.io/jokes/random');
    print(`Random Joke: ${data.value}`);

     
    const fruitMap = new Map([
      ['apple', 1],
      ['banana', 2],
      ['orange', 3]
    ]);

    const newFruitMap = new Map([...fruitMap, ['grape', 4]]);
    print(newFruitMap);

  } catch (error) {
    console.error('Error:', error);
  }
})();
