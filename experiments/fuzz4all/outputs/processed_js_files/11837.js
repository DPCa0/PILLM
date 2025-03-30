 
class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

     
    add({ real, imaginary }) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

     
    get magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

     
    static fromString(str) {
        const match = str.match(/([\d.-]+)\s*\+\s*([\d.-]+)i/);
        if (!match) throw new Error("Invalid complex number format");
        return new ComplexNumber(parseFloat(match[1]), parseFloat(match[2]));
    }

     
    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

 
async function fetchComplexNumbers() {
    const mockFetch = () => Promise.resolve(['3 + 4i', '1 + 2i', '-1 + 1i']);
    try {
        const data = await mockFetch();
        const complexNumbers = data.map(ComplexNumber.fromString);
        const sum = complexNumbers.reduce((acc, cn) => acc.add(cn), new ComplexNumber(0, 0));
        print(`Sum of complex numbers: ${sum.toString()}`);
        print(`Magnitude of the sum: ${sum.magnitude}`);
    } catch (error) {
        console.error("Error fetching complex numbers:", error);
    }
}

 
fetchComplexNumbers();
