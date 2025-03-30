class Shape {
  constructor(type) {
    this.type = type;
  }
  
  describe() {
    print(`This is a ${this.type}.`);
  }
}

class Circle extends Shape {
  #radius;  

  constructor(radius) {
    super('circle');
    this.#radius = radius;
  }
  
  get area() {
    return Math.PI * this.#radius ** 2;
  }
  
  static compare(c1, c2) {
    return c1.area - c2.area;
  }
}

const generateRandomShapes = (n) => {
  return Array.from({ length: n }, () => new Circle(Math.random() * 10));
};

async function fetchDescriptionAndCalculateArea(circle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      circle.describe();
      resolve(circle.area.toFixed(2));
    }, 1000);
  });
}

(async function main() {
  try {
    const shapes = generateRandomShapes(5);
    const areas = await Promise.all(shapes.map(fetchDescriptionAndCalculateArea));
    print('Areas:', areas.join(', '));
    
    const sortedShapes = [...shapes].sort(Circle.compare);
    print('Smallest Circle Area:', sortedShapes[0].area.toFixed(2));
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
