class Shape {
  constructor(name) {
    this.name = name;
  }
  
  static description = "A class representing a geometric shape";

  getDescription() {
    return `${this.name} is a type of shape.`;
  }
}

function areaCalculator(shape) {
  return shape.calculateArea?.() ?? 'Area calculation not available';
}

const ShapeFactory = (type, ...args) => {
  switch(type) {
    case 'Circle':
      return new Circle(...args);
    case 'Rectangle':
      return new Rectangle(...args);
    default:
      throw new Error('Unknown shape type');
  }
};

class Circle extends Shape {
  constructor(radius) {
    super('Circle');
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
  
  get area() {
    return this.calculateArea();
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
  
  get area() {
    return this.calculateArea();
  }
}

const shapes = [
  ShapeFactory('Circle', 10),
  ShapeFactory('Rectangle', 5, 8),
];

for (const shape of shapes) {
  print(`${shape.name} Area: ${areaCalculator(shape)}`);
  print(`${shape.name} Description: ${shape.getDescription()}`);
}

 
const circle = new Circle(10);
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop} value`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxyCircle = new Proxy(circle, handler);
print(`Proxy Circle Area: ${proxyCircle.area}`);
proxyCircle.radius = 15;
print(`New Proxy Circle Area: ${proxyCircle.area}`);
