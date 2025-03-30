 
(async () => {
  if (typeof window === 'undefined') {
     
    const { readFile } = await import('fs/promises');

     
    const data = await readFile('example.json', 'utf8');
    print('File content:', JSON.parse(data));

     
    const person = {
      name: 'John Doe',
      age: 30
    };

    const handler = {
      get: (target, prop) => prop in target ? target[prop] : `Property ${prop} does not exist`
    };

    const proxyPerson = new Proxy(person, handler);
    print(proxyPerson.name);  
    print(proxyPerson.gender);  
  } else {
     
    print("Running in browser, dynamic imports for node features are disabled.");
  }
})();

 
class Shape {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }

  display() {
    return `Shape at position x: ${this.x}, y: ${this.y}`;
  }
}

class Circle extends Shape {
  constructor({ x, y, radius }) {
    super({ x, y });
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  display() {
    return `${super.display()} with radius: ${this.radius}`;
  }
}

const circle = new Circle({ x: 5, y: 10, radius: 7 });
print(circle.display());
print(`Circle area: ${circle.area().toFixed(2)}`);

 
const numbers = [1, 2, 3];
const moreNumbers = [4, 5, 6];
const allNumbers = [...numbers, ...moreNumbers];

print('All numbers:', allNumbers);

function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

print('Sum of all numbers:', sum(...allNumbers));
