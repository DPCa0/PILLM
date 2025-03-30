 

class Shape {
    constructor(name) {
        this.name = name;
    }
    
    describe() {
        return `This is a ${this.name}.`;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('circle');
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius ** 2;
    }
}

const calculate = async (radius) => {
    const circle = new Circle(radius);
    
     
    const log = (strings, ...values) => {
        print(strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), ''));
    };

    log`Shape: ${circle.describe()}\nArea: ${circle.area().toFixed(2)}`;
    
     
    const simulateAsyncOperation = () => new Promise(resolve => setTimeout(resolve, 2000));

    await simulateAsyncOperation();
    return circle.area();
};

 
const [radius, ...rest] = [10, 20, 30];
const radii = [radius, ...rest];

Promise.all(radii.map(async (r) => {
    const area = await calculate(r);
    print(`The area for radius ${r} is ${area.toFixed(2)}.\n`);
}));
