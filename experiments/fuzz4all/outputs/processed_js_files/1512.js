class Shape {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return `A shape named ${this.name}.`;
  }
}

class Polygon extends Shape {
  constructor(name, sides) {
    super(name);
    this.sides = sides;
  }
  perimeter() {
    return this.sides.reduce((total, side) => total + side, 0);
  }
  describe() {
    return `${super.describe()} It is a polygon with ${this.sides.length} sides.`;
  }
}

class AsyncShapeGenerator {
  static async *generateShapes() {
    const shapes = [
      new Polygon('Triangle', [3, 4, 5]),
      new Polygon('Square', [4, 4, 4, 4]),
      new Polygon('Pentagon', [5, 5, 5, 5, 5])
    ];
    for (let shape of shapes) {
       
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield shape;
    }
  }
}

(async () => {
  for await (let shape of AsyncShapeGenerator.generateShapes()) {
    print(shape.describe());
    print(`Perimeter: ${shape.perimeter()}`);
  }
})();

 
const shapeLogger = new Proxy(new Polygon('Hexagon', [6, 6, 6, 6, 6, 6]), {
  get(target, prop, receiver) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  }
});

print(shapeLogger.describe());
print(`Perimeter: ${shapeLogger.perimeter()}`);
