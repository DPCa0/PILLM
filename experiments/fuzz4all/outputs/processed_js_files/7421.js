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
    print(`${this.name}, the ${this.breed}, barks!`);
  }
}

function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

const animals = [
  new Dog('Rex', 'German Shepherd'),
  new Dog('Fido', 'Labrador')
];

animals.forEach(animal => animal.speak());

(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  for await (let num of fibonacciGenerator(5)) {
    print(num);
    await delay(500);
  }
})();

const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, val) => acc + val, 0);
print(`Sum: ${sum}`);

const squareMap = new Map(numbers.map(n => [n, n ** 2]));
for (let [num, square] of squareMap) {
  print(`Square of ${num} is ${square}`);
}
