 
class Shape {
   
  #sides;
  
  constructor(sides) {
    this.#sides = sides;
  }

   
  static describe() {
    return "Shapes are geometric figures defined by the boundaries of spaces.";
  }

   
  get sides() {
    return this.#sides;
  }

   
  *[Symbol.iterator]() {
    for (let i = 0; i < this.#sides; i++) {
      yield `Side ${i + 1}`;
    }
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property "${property}" accessed on shape`);
    return target[property];
  }
};

const triangle = new Proxy(new Shape(3), handler);

 
print(Shape.describe());

 
print(`Triangle has ${triangle.sides} sides.`);

 
print([...triangle]);

 
async function calculateArea() {
  const { default: math } = await import('mathjs');
  const base = 5, height = 10;
  return math.multiply(0.5, base, height);
}

 
calculateArea().then(area => print(`Area of triangle: ${area}`));
