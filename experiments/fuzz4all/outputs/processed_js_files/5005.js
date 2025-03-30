 

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  speak() {
    print(`${this.name} barks.`);
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchDogData() {
  try {
    await delay(1000);  
    const dogData = {
      name: 'Rover',
      age: 5,
      breed: 'Labrador',
    };
    return dogData;
  } catch (error) {
    console.error('Error fetching dog data:', error);
  }
}

async function main() {
  const { name, breed } = await fetchDogData();
  const dog = new Dog(name);
  print(`Fetched dog data: Name - ${name}, Breed - ${breed}`);
  dog.speak();
}

main();
