class Shape {
  constructor(name) {
    this.name = name;
  }
  
  display() {
    print(`This is a ${this.name}.`);
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

  *points() {
    yield* [
      [0, 0],
      [0, this.height],
      [this.width, this.height],
      [this.width, 0],
    ];
  }
  
  display() {
    super.display();
    print(`Width: ${this.width}, Height: ${this.height}, Area: ${this.area}`);
    print('Corners:');
    for (const point of this.points()) {
      print(`(${point[0]}, ${point[1]})`);
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const rectangle = new Rectangle(10, 5);
  rectangle.display();

  await delay(2000);
  print('After 2 seconds, recalculating area with new dimensions...');
  rectangle.width = 12;
  rectangle.height = 7;
  rectangle.display();
}

main();
