class Shape {
  constructor(name, sides, sideLength) {
    this.name = name;
    this.sides = sides;
    this.sideLength = sideLength;
  }

  calcPerimeter() {
    return this.sides * this.sideLength;
  }
}

class Square extends Shape {
  constructor(sideLength) {
    super('square', 4, sideLength);
  }

  calcArea() {
    return this.sideLength ** 2;
  }
}

const shapes = [
  new Shape('triangle', 3, 3),
  new Square(5),
  new Shape('pentagon', 5, 4)
];

const calculateProperties = async () => {
  const promises = shapes.map(async (shape) => {
    const perimeter = shape.calcPerimeter();
    const area = shape instanceof Square ? shape.calcArea() : 'N/A';
    
    return { name: shape.name, perimeter, area };
  });

  const results = await Promise.all(promises);
  results.forEach(({ name, perimeter, area }) => {
    print(`Shape: ${name}, Perimeter: ${perimeter}, Area: ${area}`);
  });
};

calculateProperties().catch(console.error);

const advancedProxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} not found`);
      return null;
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number' && value > 0) {
      target[prop] = value;
      return true;
    } else {
      console.error('Invalid value');
      return false;
    }
  }
};

const testShape = new Square(10);
const proxiedSquare = new Proxy(testShape, advancedProxyHandler);

proxiedSquare.sideLength = 15;
print(`Updated sideLength: ${proxiedSquare.sideLength}`); 

proxiedSquare.newProp = 5; 
