 
class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    static add(c1, c2) {
        return new ComplexNumber(c1.real + c2.real, c1.imaginary + c2.imaginary);
    }

    static multiply(c1, c2) {
        const real = c1.real * c2.real - c1.imaginary * c2.imaginary;
        const imaginary = c1.real * c2.imaginary + c1.imaginary * c2.real;
        return new ComplexNumber(real, imaginary);
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

async function main() {
    try {
        const data = await fetchData('https://api.quotable.io/random');
        print(`Random Quote: "${data.content}" - ${data.author}`);
    } catch (error) {
        console.error('Fetching error:', error);
    }

    const num1 = new ComplexNumber(3, 2);
    const num2 = new ComplexNumber(1, 7);
    print(`Num1: ${num1.toString()}`);
    print(`Num2: ${num2.toString()}`);

    const sum = ComplexNumber.add(num1, num2);
    print(`Sum: ${sum.toString()}`);

    const product = ComplexNumber.multiply(num1, num2);
    print(`Product: ${product.toString()}`);
}

 
function logStyled(strings, ...values) {
    const styled = strings.reduce((result, string, i) => {
        const value = values[i - 1];
        return result + (typeof value === 'number' ? `%c${value}%c` : value) + string;
    });
    print(styled, ...values.map(val => typeof val === 'number' ? ['color: blue;', 'color: initial;'] : []).flat());
}

logStyled`Starting complex JavaScript program with ES6+ features...`;
main();
