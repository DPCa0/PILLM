class Shape {
  constructor(name) {
    this.name = name;
  }

  get area() {
    return 0;
  }

  toString() {
    return `${this.name} with area ${this.area}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }

  get area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }
}

function logAreas(...shapes) {
  for (let shape of shapes) {
    print(shape.toString());
  }
}

const circle = new Circle(10);
const rectangle = new Rectangle(4, 5);

Promise.resolve([circle, rectangle])
  .then((shapes) => {
    shapes.forEach((shape) => {
      setTimeout(() => print(`Delayed: ${shape.toString()}`), 1000);
    });
    return shapes;
  })
  .then(logAreas)
  .catch(console.error);

async function fetchShapes() {
  const response = await fetch('https://api.example.com/shapes');
  const data = await response.json();
  return data.map((shape) => {
    if (shape.type === 'circle') return new Circle(shape.radius);
    if (shape.type === 'rectangle') return new Rectangle(shape.width, shape.height);
    return new Shape('Unknown');
  });
}

fetchShapes()
  .then(logAreas)
  .catch(console.error);
