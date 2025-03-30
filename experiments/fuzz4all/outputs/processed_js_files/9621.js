class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    throw new Error('Method area() must be implemented.');
  }
}

class Circle extends Shape {
  #radius;
  constructor(radius) {
    super('Circle');
    this.#radius = radius;
  }
  area() {
    return Math.PI * this.#radius ** 2;
  }
}

class Square extends Shape {
  #side;
  constructor(side) {
    super('Square');
    this.#side = side;
  }
  area() {
    return this.#side ** 2;
  }
}

function* shapeGenerator() {
  yield new Circle(3);
  yield new Square(4);
}

const shapes = [...shapeGenerator()];

shapes.forEach((shape) => {
  print(`Shape: ${shape.name}, Area: ${shape.area().toFixed(2)}`);
});

(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  print('Fetched Data:', data);
})().catch((error) => console.error('Error fetching data:', error));
