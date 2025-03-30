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
    print(`${this.name} barks. It's a ${this.breed}.`);
  }

  static description() {
    return `Dogs are known to be man's best friend.`;
  }
}

function *fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const dog1 = new Dog('Buddy', 'Golden Retriever');
dog1.speak();
print(Dog.description());

const fibGen = fibonacci();
print(`Fibonacci Sequence: ${Array.from({ length: 5 }, () => fibGen.next().value)}`);

const data = [10, 20, 30, 40];
const squaredData = data.map(n => n ** 2);
print(`Squared Data: ${squaredData}`);

async function fetchDogFact() {
  try {
    const response = await fetch('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs?number=1');
    const fact = await response.json();
    print(`Random Dog Fact: ${fact[0].fact}`);
  } catch (error) {
    console.error('Failed to fetch dog fact:', error);
  }
}

fetchDogFact();
