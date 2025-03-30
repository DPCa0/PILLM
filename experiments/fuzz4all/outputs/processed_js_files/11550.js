 

class Shape {
    constructor(type) {
        this.type = type;
    }

    static describe() {
        return 'Shapes are the forms of objects.';
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

const circle = new Circle(5);

 
function getShapeDescription() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Circle.describe());
        }, 1000);
    });
}

async function displayShapeInfo() {
    const description = await getShapeDescription();
    print(description);
    print(`Type: ${circle.type}`);
    print(`Area: ${circle.area.toFixed(2)}`);

    circle.area = 50;  
    print(`Updated Radius: ${circle.radius.toFixed(2)}`);
}

 
const circleProxy = new Proxy(circle, {
    get(target, prop) {
        if (prop === 'radius') {
            print(`Accessing radius: ${target[prop]}`);
            return target[prop];
        }
        return target[prop];
    },
    set(target, prop, value) {
        if (prop === 'radius') {
            print(`Setting radius to: ${value}`);
        }
        target[prop] = value;
        return true;
    }
});

 
displayShapeInfo();
circleProxy.radius = 7;
print(`Proxy Access - Radius: ${circleProxy.radius}`);
