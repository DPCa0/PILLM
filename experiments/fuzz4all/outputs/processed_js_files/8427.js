class Shape {
    constructor(name) {
        this.name = name;
    }
    
    static description() {
        return "This is a shape class.";
    }
    
    getName() {
        return this.name;
    }
}

function logExecutionTime(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        console.time(key);
        const result = originalMethod.apply(this, args);
        console.timeEnd(key);
        return result;
    }
    return descriptor;
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    
    @logExecutionTime
    getArea() {
        return Math.PI * this.radius ** 2;
    }
    
    static fromDiameter(diameter) {
        return new Circle(diameter / 2);
    }
}

async function* fibonacciGenerator() {
    let [a, b] = [0, 1];
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield a;
        [a, b] = [b, a + b];
    }
}

const circle = Circle.fromDiameter(10);
print(`Shape: ${circle.getName()}, Area: ${circle.getArea()}`);
print(Shape.description());

(async () => {
    const fibGen = fibonacciGenerator();
    for await (const num of fibGen) {
        print(`Fibonacci: ${num}`);
        if (num > 20) break;  
    }
})();
