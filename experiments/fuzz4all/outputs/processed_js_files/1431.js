class Shape {
  constructor(name) {
    this.name = name;
  }
  display() {
    print(`Shape: ${this.name}`);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
  
  static fromDiameter(diameter) {
    return new Circle(diameter / 2);
  }
}

const shape = new Shape('Generic Shape');
shape.display();

const circle = Circle.fromDiameter(10);
circle.display();
print(`Area: ${circle.area().toFixed(2)}`);

const asyncFetch = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

asyncFetch('https://jsonplaceholder.typicode.com/todos/1');

const nums = [1, 2, 3, 4, 5];
const doubleNums = nums.map(n => n * 2);

const [first, second, ...rest] = doubleNums;
print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);

function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const gen = idGenerator();
print(`ID: ${gen.next().value}`);
print(`ID: ${gen.next().value}`);
print(`ID: ${gen.next().value}`);
