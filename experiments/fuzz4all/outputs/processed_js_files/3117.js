class ComplexNumber {
    #real;
    #imaginary;
    
    constructor(real, imaginary) {
        this.#real = real;
        this.#imaginary = imaginary;
    }
    
    toString() {
        return `${this.#real} ${this.#imaginary >= 0 ? '+' : '-'} ${Math.abs(this.#imaginary)}i`;
    }
    
    static fromPolar(r, theta) {
        return new ComplexNumber(r * Math.cos(theta), r * Math.sin(theta));
    }

    [Symbol.iterator]() {
        return [this.#real, this.#imaginary][Symbol.iterator]();
    }

    add({ #real, #imaginary }) {
        return new ComplexNumber(this.#real + #real, this.#imaginary + #imaginary);
    }

    multiply({ #real, #imaginary }) {
        const real = this.#real * #real - this.#imaginary * #imaginary;
        const imaginary = this.#real * #imaginary + this.#imaginary * #real;
        return new ComplexNumber(real, imaginary);
    }

    get magnitude() {
        return Math.hypot(this.#real, this.#imaginary);
    }
}

const complex1 = new ComplexNumber(2, 3);
const complex2 = ComplexNumber.fromPolar(2, Math.PI / 4);

const sum = complex1.add(complex2);
const product = complex1.multiply(complex2);

print(`Complex 1: ${complex1}`);
print(`Complex 2: ${complex2}`);
print(`Sum: ${sum}`);
print(`Product: ${product}`);
print(`Magnitude of Complex 1: ${complex1.magnitude}`);

for (const value of complex1) {
    print(value);
}
