class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({ real, imaginary }) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    multiply({ real, imaginary }) {
        const realPart = this.real * real - this.imaginary * imaginary;
        const imaginaryPart = this.real * imaginary + this.imaginary * real;
        return new ComplexNumber(realPart, imaginaryPart);
    }

    static fromString(complexStr) {
        const [real, imaginary] = complexStr.match(/-?\d+/g).map(Number);
        return new ComplexNumber(real, imaginary);
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
        }
        return `${this.real} + ${this.imaginary}i`;
    }

    async *fibonacciSequence(n) {
        let a = new ComplexNumber(0, 0);
        let b = new ComplexNumber(1, 0);
        for (let i = 0; i < n; i++) {
            yield a;
            [a, b] = [b, a.add(b)];
        }
    }
}

(async () => {
    const complex1 = ComplexNumber.fromString("3 + 4i");
    const complex2 = new ComplexNumber(2, -1);
    const product = complex1.multiply(complex2);

    print(`Product of ${complex1} and ${complex2} is ${product}`);
    print(`Magnitude of product: ${+product}`);

    print('First 5 complex Fibonacci numbers:');
    for await (const fib of complex1.fibonacciSequence(5)) {
        print(fib);
    }
})();
