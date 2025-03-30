class Shape {
    constructor(name) {
        this.name = name;
    }

    static describe() {
        return 'This is a geometric shape.';
    }

    printName() {
        print(`This shape is a ${this.name}.`);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('circle');
        this.radius = radius;
    }

    get area() {
        return Math.PI * this.radius ** 2;
    }

    set area(value) {
        this.radius = Math.sqrt(value / Math.PI);
    }

    *pointsOnCircumference(n) {
        for (let i = 0; i < n; i++) {
            const theta = (i * 2 * Math.PI) / n;
            yield [this.radius * Math.cos(theta), this.radius * Math.sin(theta)];
        }
    }
}

const myCircle = new Circle(3);
print(Shape.describe());
myCircle.printName();
print(`Area: ${myCircle.area.toFixed(2)}`);

myCircle.area = 50;  
print(`New radius: ${myCircle.radius.toFixed(2)}`);

print('Points on circumference:');
for (const point of myCircle.pointsOnCircumference(5)) {
    print(`(${point[0].toFixed(2)}, ${point[1].toFixed(2)})`);
}

(async () => {
    const delayedMessage = new Promise(resolve => setTimeout(resolve, 1000, 'Async greeting: Hello, world!'));
    print(await delayedMessage);
})();
