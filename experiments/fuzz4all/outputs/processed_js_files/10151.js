class Shape {
    constructor(name) {
        this.name = name;
    }
    static info() {
        return "This is a shape.";
    }
    describe() {
        return `A shape called ${this.name}.`;
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
    set area(value) {
        this.radius = Math.sqrt(value / Math.PI);
    }
}

const logTimeExecution = (fn) => {
    return (...args) => {
        console.time(fn.name);
        const result = fn(...args);
        console.timeEnd(fn.name);
        return result;
    };
};

const calculateArea = logTimeExecution((radius) => {
    const circle = new Circle(radius);
    return circle.area;
});

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const main = async () => {
    print(Shape.info());
    print('Circle with radius 3 has area:', calculateArea(3));

    print('Fetching data from JSONPlaceholder...');
    await fetchData('https://jsonplaceholder.typicode.com/posts/1');

    const circle = new Circle(5);
    print(circle.describe());
    print('Area:', circle.area);
    circle.area = 50;
    print('New Radius:', circle.radius.toFixed(2));
};

main();
