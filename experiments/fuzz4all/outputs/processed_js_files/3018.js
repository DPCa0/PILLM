class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({ real, imaginary }) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    multiply({ real, imaginary }) {
        return new ComplexNumber(
            this.real * real - this.imaginary * imaginary,
            this.real * imaginary + this.imaginary * real
        );
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} does not exist`);
            return undefined;
        }
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const [firstComplex, ...otherComplexNumbers] = [
    new ComplexNumber(2, 3),
    new ComplexNumber(4, 5),
    new ComplexNumber(6, -7)
];

 
const proxyComplex = new Proxy(firstComplex, handler);

print(proxyComplex.toString());

const addedComplex = proxyComplex.add(otherComplexNumbers[0]);
print(`Added: ${addedComplex.toString()}`);

const multipliedComplex = proxyComplex.multiply(otherComplexNumbers[1]);
print(`Multiplied: ${multipliedComplex.toString()}`);

 
async function calculateComplexOperations() {
    const delayedAddition = new Promise(resolve => setTimeout(() => {
        resolve(proxyComplex.add(new ComplexNumber(10, -10)));
    }, 1000));

    const delayedResult = await delayedAddition;
    print(`Async Added Result: ${delayedResult.toString()}`);
}

calculateComplexOperations();
