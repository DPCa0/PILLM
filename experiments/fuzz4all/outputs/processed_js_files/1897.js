class Shape {
    constructor(name) {
        this.name = name;
    }

     
    static #calculate = Symbol('calculate');

     
    static getTrackedInstance(instance) {
        return new Proxy(instance, {
            get(target, prop, receiver) {
                if (prop === 'perimeter') {
                    print(`Accessing perimeter of ${target.name}`);
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }
    
    [Shape.#calculate]() {
        throw 'Not Implemented';
    }

     
    getDescription() {
        print(`This is a ${this.name}.`);
        return this;
    }

    calculate() {
        print(`Calculating ${this.name}...`);
        this[Shape.#calculate]();
        return this;
    }
}

class Square extends Shape {
    constructor(sideLength) {
        super('Square');
        this.sideLength = sideLength;
    }

    [Shape.#calculate]() {
        this.area = this.sideLength ** 2;
        this.perimeter = 4 * this.sideLength;
    }
}

 
const shapes = new Map();
const mySquare = Shape.getTrackedInstance(new Square(5)).getDescription().calculate();
shapes.set(mySquare.name, mySquare);

 
const { area, perimeter } = shapes.get('Square');
print(`Area: ${area}, Perimeter: ${perimeter}`);

 
async function fetchShapeData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Shape data loaded!');
        }, 2000);
    });
}

(async function displayData() {
    const message = await fetchShapeData();
    print(message);
})();
