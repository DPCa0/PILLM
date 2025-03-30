class Shape {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return `Shape: ${this.name}`;
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

    *generatePoints(count = 100) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI;
            yield {
                x: this.radius * Math.cos(angle),
                y: this.radius * Math.sin(angle)
            };
        }
    }

    static fromDiameter(diameter) {
        return new Circle(diameter / 2);
    }
}

(async () => {
    const circle = Circle.fromDiameter(10);
    print(circle.getName());
    print(`Area: ${circle.area}`);

    for await (const point of circle.generatePoints(10)) {
        print(`Point: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`);
    }

    const pointMapper = (fn, iter) => ({
        [Symbol.asyncIterator]: async function* () {
            for await (const item of iter) {
                yield fn(item);
            }
        }
    });

    const scaledPoints = pointMapper(p => ({ x: p.x * 2, y: p.y * 2 }), circle.generatePoints(5));
    
    print("Scaled Points:");
    for await (const point of scaledPoints) {
        print(`Point: (${point.x.toFixed(2)}, ${point.y.toFixed(2)})`);
    }
})();
