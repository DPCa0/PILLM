 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function processData({ name, age, location }) {
    return `Name: ${name}, Age: ${age}, Location: ${location}`;
}

async function main() {
    try {
        const data = await fetchData('https://api.example.com/user');
        print(processData(data));
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

main();

 
class Shape {
    constructor(name) {
        this.name = name;
    }

    display() {
        print(`This is a ${this.name}`);
    }

    static description() {
        return 'This is a base class for shapes.';
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * this.radius ** 2;
    }
}

print(Shape.description());

const circle = new Circle(5);
circle.display();
print(`Area of the circle: ${circle.calculateArea()}`);
