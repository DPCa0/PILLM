class Shape {
    constructor(type) {
        this.type = type;
    }
    toString() {
        return `${this.type} with an area of ${this.area()}`;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    area() {
        return (Math.PI * this.radius ** 2).toFixed(2);
    }
}

class Square extends Shape {
    constructor(side) {
        super('Square');
        this.side = side;
    }
    area() {
        return (this.side ** 2).toFixed(2);
    }
}

const shapes = [
    new Circle(5),
    new Square(4),
    new Circle(3.5),
    new Square(7.2)
];

shapes.forEach(shape => print(shape.toString()));

 
const handler = {
    get(target, prop) {
        if (prop === 'secret') {
            throw new Error('Access denied');
        }
        return target[prop];
    }
};

const secretCircle = new Proxy(new Circle(10), handler);
try {
    print(secretCircle.secret);
} catch (e) {
    print(e.message);   
}

 
async function fetchShapeDetails(shape) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Fetching details for ${shape.type}`);
        }, 1000);
    });
}

(async function displayShapeDetails() {
    for (let shape of shapes) {
        const message = await fetchShapeDetails(shape);
        print(message);
    }
})();
