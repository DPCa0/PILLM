class Shape {
  constructor(name) {
    this.name = name;
  }
  area() {
    throw new Error('Area method must be implemented');
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
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

const shapeFactory = (type, ...params) => {
  const shapes = {
    Circle: (radius) => new Circle(radius),
    Rectangle: (width, height) => new Rectangle(width, height),
  };
  return shapes[type] ? shapes[type](...params) : null;
};

const logShapesArea = async (shapes) => {
  for (const shape of shapes) {
    const area = await new Promise((resolve) =>
      setTimeout(() => resolve(shape.area()), 100)
    );
    print(`The area of the ${shape.name} is ${area.toFixed(2)}`);
  }
};

(async () => {
  const shapes = [
    shapeFactory('Circle', 5),
    shapeFactory('Rectangle', 10, 20),
    shapeFactory('Circle', 15),
  ];

  logShapesArea(shapes.filter(Boolean));
})();
