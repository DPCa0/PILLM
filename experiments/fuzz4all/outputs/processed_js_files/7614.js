 
class Person {
  #name;
  #age;
  
  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

   
  #getName() {
    return this.#name;
  }

   
  introduce() {
    print(`Hi, I'm ${this.#getName()}. I am ${this.#age ?? 'an ageless wonder'} years old.`);
  }

  // Static method
  static compareAge(person1, person2) {
    return person1.#age - person2.#age;
  }
}

// Using Promise and async/await with fetch API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

// Using Map, Set and arrow functions
const processNumbers = (numbers) => {
  const uniqueNumbers = new Set(numbers);
  const numberMap = new Map();
  
  uniqueNumbers.forEach(num => {
    numberMap.set(num, num * num);
  });

  return numberMap;
}

// Immediately Invoked Function Expression (IIFE)
(async () => {
  const john = new Person('John', 30);
  const jane = new Person('Jane', undefined);
  john.introduce();
  jane.introduce();

  print('Comparing ages:', Person.compareAge(john, jane));

  const numbers = [1, 2, 3, 2, 4, 5, 1];
  print('Processed Numbers Map:', processNumbers(numbers));

  // Fetching data from a placeholder API
  await fetchData('https: 
})();
