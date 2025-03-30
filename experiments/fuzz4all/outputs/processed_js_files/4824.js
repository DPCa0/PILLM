class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

const symbolKey = Symbol('unique');
const obj = {
  [symbolKey]: 'symbol value',
  regularKey: 'regular value'
};

const dog = new Dog('Rex', 'Golden Retriever');
dog.speak();   

print(obj[symbolKey]);   

fetchData('https://jsonplaceholder.typicode.com/todos/1');   
