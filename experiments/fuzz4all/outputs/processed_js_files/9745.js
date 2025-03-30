class Shape {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
  area() {
    throw new Error('Area method must be implemented');
  }
}

class Circle extends Shape {
  #radius;
  constructor(radius) {
    super('Circle');
    this.#radius = radius;
  }
  area() {
    return Math.PI * (this.#radius ** 2);
  }
  static fromDiameter(diameter) {
    return new Circle(diameter / 2);
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

const shapes = [
  new Circle(10),
  Circle.fromDiameter(20),
  new Square(5),
];

const totalArea = shapes.reduce((sum, shape) => {
  print(`Calculating area for ${shape.name}`);
  return sum + shape.area();
}, 0);

print(`Total Area: ${totalArea.toFixed(2)}`);

const promiseDemo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('This message is delayed by 1 second');
};

promiseDemo();
