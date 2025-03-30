 
const fetchJoke = async () => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    if (!response.ok) throw new Error('Network response was not ok');
    const joke = await response.json();
    return `${joke.setup} - ${joke.punchline}`;
  } catch (error) {
    console.error('Fetching joke failed:', error);
  }
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const person = { name: 'Alice', age: 30 };
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property "${prop}"`);
      return target[prop];
    }
    return `Property "${prop}" does not exist`;
  },
  set: (target, prop, value) => {
    if (prop === 'age' && value < 0) {
      print('Age cannot be negative');
      return false;
    }
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};
const proxyPerson = new Proxy(person, handler);

 
const capitals = new Map([
  ['France', 'Paris'],
  ['Germany', 'Berlin'],
  ['Italy', 'Rome']
]);
for (const [country, capital] of capitals) {
  print(`The capital of ${country} is ${capital}.`);
}

 
const uniqueNumbers = new Set([1, 2, 3, 2, 4, 1]);
print('Unique numbers:', ...uniqueNumbers);

 
(() => {
  print('IIFE executed!');
})();

 
fetchJoke().then(joke => print('Random Joke:', joke));

 
class Circle {
  #radius;
  constructor(radius) {
    this.#radius = radius;
  }
  getArea() {
    return