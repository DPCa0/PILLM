class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    super.speak();
    print(`${this.name}, the ${this.breed}, barks!`);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

async function main() {
  const dog = new Dog('Buddy', 'Golden Retriever');
  dog.speak();

  print('Fetching data...');
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  await delay(2000);
  print('Program finished');
}

main().catch(console.error);
