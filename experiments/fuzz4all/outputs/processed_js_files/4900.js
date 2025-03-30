class Shape {
    constructor(name) {
        this.name = name;
    }
    description() {
        return `This is a ${this.name}`;
    }
}

function logExecution(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        print(`Calling ${propertyKey} with`, args);
        const result = originalMethod.apply(this, args);
        print(`Result: ${result}`);
        return result;
    };
    return descriptor;
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    @logExecution
    area() {
        return Math.PI * this.radius ** 2;
    }

    @logExecution
    circumference() {
        return 2 * Math.PI * this.radius;
    }
}

const circle = new Circle(5);

const asyncCalculation = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(circle.description());
    print(`Area: ${circle.area()}`);
    print(`Circumference: ${circle.circumference()}`);
};

asyncCalculation();

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(n => n * 2);
print(doubledNumbers);

const greeting = `Hello, ${
  (() => {
    try {
      throw new Error("Anonymous");
    } catch (e) {
      return e.message;
    }
  })()
}!`;

print(greeting);
