(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class ComplexNumber {
        constructor(real, imaginary) {
            this.real = real;
            this.imaginary = imaginary;
        }

        add(other) {
            return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
        }

        multiply(other) {
            const real = this.real * other.real - this.imaginary * other.imaginary;
            const imaginary = this.real * other.imaginary + this.imaginary * other.real;
            return new ComplexNumber(real, imaginary);
        }

        toString() {
            return `${this.real} + ${this.imaginary}i`;
        }
    }

    const complexSum = (arr) => arr.reduce((acc, val) => acc.add(val), new ComplexNumber(0, 0));

    const asyncComplexOperation = async (complexNumbers) => {
        print('Starting complex operations...');
        await delay(2000);
        const sum = complexSum(complexNumbers);
        const product = complexNumbers.reduce((acc, val) => acc.multiply(val), new ComplexNumber(1, 0));
        print(`Sum of complex numbers: ${sum.toString()}`);
        print(`Product of complex numbers: ${product.toString()}`);
    };

    const numbers = [new ComplexNumber(1, 2), new ComplexNumber(3, 4), new ComplexNumber(5, 6)];

    asyncComplexOperation(numbers);

    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.createElement('button');
        btn.textContent = 'Calculate Again';
        btn.onclick = () => asyncComplexOperation(numbers);
        document.body.appendChild(btn);
    });
})();
