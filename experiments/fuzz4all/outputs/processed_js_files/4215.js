class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }
    
    add({ real, imaginary }) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    subtract({ real, imaginary }) {
        return new ComplexNumber(this.real - real, this.imaginary - imaginary);
    }
    
    multiply({ real, imaginary }) {
        return new ComplexNumber(
            this.real * real - this.imaginary * imaginary,
            this.real * imaginary + this.imaginary * real
        );
    }

    divide({ real, imaginary }) {
        const denominator = real * real + imaginary * imaginary;
        return new ComplexNumber(
            (this.real * real + this.imaginary * imaginary) / denominator,
            (this.imaginary * real - this.real * imaginary) / denominator
        );
    }

    toString() {
        return `${this.real} ${this.imaginary >= 0 ? '+' : '-'} ${Math.abs(this.imaginary)}i`;
    }

    *[Symbol.iterator]() {
        yield this.real;
        yield this.imaginary;
    }
}

const complexHandler = {
    get(target, prop) {
        if (prop === 'magnitude') {
            return Math.sqrt(target.real ** 2 + target.imaginary ** 2);
        }
        return target[prop];
    }
};

function* complexSequence(n, start = 1) {
    for (let i = start; i <= n; i++) {
        yield new ComplexNumber(i, i + 1);
    }
}

const complex1 = new ComplexNumber(2, 3);
const complex2 = new ComplexNumber(4, -5);

const complexProxy = new Proxy(complex1, complexHandler);

print(`Complex 1: ${complexProxy.toString()}`);
print(`Complex 2: ${complex2.toString()}`);
print(`Magnitude of Complex 1: ${complexProxy.magnitude.toFixed(2)}`);

print(`Sum: ${complex1.add(complex2).toString()}`);
print(`Difference: ${complex1.subtract(complex2).toString()}`);
print(`Product: ${complex1.multiply(complex2).toString()}`);
print(`Quotient: ${complex1.divide(complex2).toString()}`);

print('Complex sequence from 1 to 3:');
for (const complex of complexSequence(3