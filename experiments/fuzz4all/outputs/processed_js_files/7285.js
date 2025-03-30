class Shape {
  constructor(name) {
    this.name = name;
  }
  display() {
    print(`This is a ${this.name}.`);
  }
}

class Polygon extends Shape {
  constructor(name, ...sides) {
    super(name);
    this.sides = sides;
  }
  
  get countSides() {
    return this.sides.length;
  }
  
  get perimeter() {
    return this.sides.reduce((acc, side) => acc + side, 0);
  }
}

class Square extends Polygon {
  constructor(side) {
    super('Square', side, side, side, side);
  }
  
  get area() {
    return this.sides[0] ** 2;
  }
  
  static *describeProperties() {
    yield "Name";
    yield "Sides";
    yield "Perimeter";
    yield "Area";
  }
}

(async function() {
  const square = new Square(4);
  square.display();
  print(`Count of sides: ${square.countSides}`);
  print(`Perimeter: ${square.perimeter}`);
  print(`Area: ${square.area}`);

  const properties = Square.describeProperties();
  for await (let property of properties) {
    print(`Square has: ${property}`);
  }

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  print("Simulating async operation...");
  await delay(1000);
  print("Done!");
})();
