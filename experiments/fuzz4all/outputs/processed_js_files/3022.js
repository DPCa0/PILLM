class Shape {
    constructor(name) {
        this.name = name;
    }

    static fromJSON(jsonStr) {
        const { type, ...props } = JSON.parse(jsonStr);
        if (type === 'circle') return new Circle(props.radius);
        if (type === 'square') return new Square(props.side);
        throw new Error(`Unknown shape type: ${type}`);
    }

    toJSON() {
        return JSON.stringify({ type: this.constructor.name.toLowerCase(), ...this });
    }

    *area() {
        throw new Error('Area method not implemented');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    *area() {
        yield `Calculating area for ${this.name}`;
        return Math.PI * this.radius ** 2;
    }
}

class Square extends Shape {
    constructor(side) {
        super('Square');
        this.side = side;
    }

    *area() {
        yield `Calculating area for ${this.name}`;
        return this.side ** 2;
    }
}

async function logShapeArea(shape) {
    print('Starting area calculation...');
    const generator = shape.area();
    print(generator.next().value);
    const area = await Promise.resolve(generator.next().value);
    print(`Area: ${area}`);
}

async function main() {
    const circle = new Circle(5);
    const square = new Square(4);

    await logShapeArea(circle);
    await logShapeArea(square);

    const serializedCircle = circle.toJSON();
    print(`Serialized Circle: ${serializedCircle}`);

    const deserializedCircle = Shape.fromJSON(serializedCircle);
    await logShapeArea(deserializedCircle);
}

main();
