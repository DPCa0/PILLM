class Shape {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  static createRandomShape() {
    const shapes = [new Circle(), new Square(), new Triangle()];
    return shapes[Math.floor(Math.random() * shapes.length)];
  }
}

class Circle extends Shape {
  constructor() {
    super('Circle');
  }

  area(radius) {
    return Math.PI * radius ** 2;
  }
}

class Square extends Shape {
  constructor() {
    super('Square');
  }

  area(side) {
    return side ** 2;
  }
}

class Triangle extends Shape {
  constructor() {
    super('Triangle');
  }

  area(base, height) {
    return 0.5 * base * height;
  }
}

const generateRandomParameters = shape => {
  switch (shape.getName()) {
    case 'Circle':
      return [Math.random() * 10];
    case 'Square':
      return [Math.random() * 10];
    case 'Triangle':
      return [Math.random() * 10, Math.random() * 10];
  }
};

(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < 5; i++) {
    await delay(1000);  

    const shape = Shape.createRandomShape();
    const params = generateRandomParameters(shape);
    const area = shape.area(...params);

    console.log(
      `Shape: ${shape.getName()}, Parameters: ${params.join(
        ', '
      )}, Area: ${area.toFixed(2)}`
    );
  }
})();
