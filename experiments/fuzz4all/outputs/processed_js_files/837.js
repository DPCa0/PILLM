class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({real, imaginary}) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    multiply({real, imaginary}) {
        const newReal = this.real * real - this.imaginary * imaginary;
        const newImaginary = this.real * imaginary + this.imaginary * real;
        return new ComplexNumber(newReal, newImaginary);
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

async function processComplexOperations(numbers) {
    const results = await Promise.all(numbers.map(async (num, index) => {
        const nextIndex = (index + 1) % numbers.length;
        const sum = num.add(numbers[nextIndex]);
        const product = num.multiply(numbers[nextIndex]);
        await new Promise(resolve => setTimeout(resolve, 10));  
        return {sum: sum.toString(), product: product.toString()};
    }));

    console.table(results);
}

const complexNumbers = [
    new ComplexNumber(2, 3),
    new ComplexNumber(1, 7),
    new ComplexNumber(5, -1)
];

processComplexOperations(complexNumbers);
