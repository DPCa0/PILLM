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
        const sign = this.imaginary >= 0 ? '+' : '-';
        return `${this.real} ${sign} ${Math.abs(this.imaginary)}i`;
    }
}

(async function () {
    const complex1 = new ComplexNumber(3, 4);
    const complex2 = new ComplexNumber(1, 2);

    const sum = complex1.add(complex2);
    const product = complex1.multiply(complex2);

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (const value of ['Calculating sum...', sum, 'Calculating product...', product]) {
        print(value instanceof ComplexNumber ? value.toString() : value);
        await delay(1000);
    }
})();
