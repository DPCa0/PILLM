class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({ real, imaginary }) {
        return new Complex(this.real + real, this.imaginary + imaginary);
    }

    multiply({ real, imaginary }) {
        return new Complex(
            this.real * real - this.imaginary * imaginary,
            this.real * imaginary + this.imaginary * real
        );
    }

    toString() {
        return `${this.real} ${this.imaginary < 0 ? '-' : '+'} ${Math.abs(this.imaginary)}i`;
    }
}

 
const complexHandler = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Calling ${prop} with arguments: ${args.map(a => a.toString()).join(', ')}`);
                const result = target[prop].apply(this, args);
                print(`Result of ${prop}: ${result.toString()}`);
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
async function performComplexOperations() {
    const complex1 = new Complex(2, 3);
    const complex2 = new Complex(4, -5);

    const proxyComplex1 = new Proxy(complex1, complexHandler);
    const proxyComplex2 = new Proxy(complex2, complexHandler);

    print(`Starting operations with: ${proxyComplex1.toString()} and ${proxyComplex2.toString()}`);

    const sumPromise = Promise.resolve(proxyComplex1.add(proxyComplex2));
    const productPromise = Promise.resolve(proxyComplex1.multiply(proxyComplex2));

    const [sum, product] = await Promise.all([sumPromise, productPromise]);

    print(`Sum: ${sum.toString()}`);
    print(`Product: ${product.toString()}`);
}

performComplexOperations();
