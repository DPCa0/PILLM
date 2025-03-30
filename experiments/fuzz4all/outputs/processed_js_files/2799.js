class Shape {
  constructor(name) {
    this.name = name;
  }

  static #idCounter = 0;  

  static getUniqueId() {
    return `shape-${this.#idCounter++}`;
  }

  describe() {
    return `This is a ${this.name}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('circle');
    this.radius = radius;
    this.id = Shape.getUniqueId();
  }

  get area() {
    return (Math.PI * this.radius ** 2).toFixed(2);
  }

  [Symbol.iterator]() {
    let properties = Object.entries(this);
    let count = 0;
    return {
      next: () => {
        if (count < properties.length) {
          return { value: properties[count++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  static async logArea(circle) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`The area of the circle with ID: ${circle.id} is ${circle.area}`);
  }
}

(async () => {
  const circle = new Circle(5);
  print(circle.describe());

  for (const [key, value] of circle) {
    print(`${key}: ${value}`);
  }

  await Circle.logArea(circle);
})();
