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

const asyncOperation = () => {
    return new Promise(resolve => setTimeout(() => resolve(new ComplexNumber(1, 2)), 1000));
};

(async () => {
    try {
        const complex1 = new ComplexNumber(3, 4);
        const complex2 = await asyncOperation();

        print(`Complex1: ${complex1.toString()}`);
        print(`Complex2: ${complex2.toString()}`);

        const sum = complex1.add(complex2);
        print(`Sum: ${sum.toString()}`);

        const product = complex1.multiply(complex2);
        print(`Product: ${product.toString()}`);
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
})();
