 
const multiply = (...args) => args.reduce((acc, num) => acc * num, 1);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function introducePerson({ name, age, city }) {
  print(`Hello! My name is ${name}, I'm ${age} years old, and I live in ${city}.`);
}

// Class with getters, setters, static methods, and private fields
class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get area() {
    return this.#width * this.#height;
  }

  set dimensions({ width, height }) {
    this.#width = width;
    this.#height = height;
  }

  static isSquare(rect) {
    return rect.#width === rect.#height;
  }
}

// Using Proxy to log operations on an object
const person = new Proxy({ name: 'Alice', age: 30 }, {
  get(target, prop) {
    print(`Getting ${prop}: ${target[prop]}`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
});

// Invoking functions and class operations
const nums = [2, 3, 4];
print(`The product is: ${multiply(...nums)}`);

fetchData('https: 
  .then(data => print('Fetched data:', data));

introducePerson({ name: 'John', age: 25, city: 'New York' });

const rect = new Rectangle(10, 20);
print(`Rectangle area: ${rect.area}`);
rect.dimensions = { width: 15, height: 15 };
print(`New Rectangle area: ${rect.area}`);
print(`Is square: ${Rectangle.isSquare(rect)}`);

person.name = 'Bob';
print(person.age);
