class Shape {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  static describe() {
    return 'Shapes can be many different forms and sizes.';
  }
}

const shapeMixin = {
  getDescription() {
    return `This is a shape called ${this.name}.`;
  }
};

Object.assign(Shape.prototype, shapeMixin);

class Circle extends Shape {
  #radius;

  constructor(radius) {
    super('Circle');
    this.#radius = radius;
  }

  get area() {
    return Math.PI * this.#radius ** 2;
  }

  *points() {
    for (let angle = 0; angle < 360; angle += 90) {
      yield {
        x: this.#radius * Math.cos((angle * Math.PI) / 180),
        y: this.#radius * Math.sin((angle * Math.PI) / 180)
      };
    }
  }

  static [Symbol.hasInstance](instance) {
    return instance.getName && instance.getName() === 'Circle';
  }
}

const circle = new Circle(5);

const complexOperation = async (shape) => {
  print(Shape.describe());
  print(shape.getDescription());
  print(`Area: ${shape.area}`);
  
  print('Points on Circle:');
  for (const point of shape.points()) {
    print(`x: ${point.x.toFixed(2)}, y: ${point.y.toFixed(2)}`);
  }

  return new Promise((resolve) => setTimeout(() => resolve('Operation complete.'), 1000));
};

(async () => {
  if (circle instanceof Circle) {
    const message = await complexOperation(circle);
    print(message);
  }
})();
