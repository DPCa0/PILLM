class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add(other) {
        return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
    }

    multiply(other) {
        return new ComplexNumber(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real
        );
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

const asyncIterator = {
    async *[Symbol.asyncIterator]() {
        const data = await fetchData('https://api.example.com/data');
        for (const item of data) {
            yield item;
        }
    }
};

(async () => {
    const num1 = new ComplexNumber(2, 3);
    const num2 = new ComplexNumber(4, -1);
    const result = num1.multiply(num2);

    print(`Complex Multiplication Result: ${result.toString()}`);

    for await (const item of asyncIterator) {
        print(item);
    }
})();
