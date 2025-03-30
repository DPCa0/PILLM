class Shape {
    constructor(name) {
        this.name = name;
    }
    get area() {
        throw new Error('Area method must be implemented by subclasses');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    get area() {
        return Math.PI * this.radius ** 2;
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
}

class ShapeAreaCalculator {
    static calculateTotalArea(shapes) {
        return shapes.reduce((total, shape) => total + shape.area, 0);
    }
}

const shapes = [
    new Circle(10),
    new Rectangle(4, 5),
    new Circle(5),
    new Rectangle(7, 8)
];

print('Total Area:', ShapeAreaCalculator.calculateTotalArea(shapes));

 
const handler = {
    get(target, property, receiver) {
        print(`Accessed property: "${property}"`);
        return Reflect.get(target, property, receiver);
    }
};

const proxiedCircle = new Proxy(new Circle(3), handler);
print(`Proxied Circle Area: ${proxiedCircle.area}`);

 
function* shapeGenerator(shapes) {
    for (const shape of shapes) {
        yield shape;
    }
}

const shapeIterator = shapeGenerator(shapes);
for (const shape of shapeIterator) {
    print(`Shape: ${shape.name}, Area: ${shape.area}`);
}

 
async function fetchShapeDetails(shape) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Fetched details for shape: ${shape.name} with area: ${shape.area}`);
        }, 1000);
    });
}

(async () => {
    for (const shape of shapes) {
        const details = await fetchShapeDetails(shape);
        print(details);
    }
})();
