class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    add({ real, imag }) {
        return new Complex(this.real + real, this.imag + imag);
    }

    multiply({ real, imag }) {
        return new Complex(
            this.real * real - this.imag * imag,
            this.real * imag + this.imag * real
        );
    }

    toString() {
        return `${this.real} ${this.imag >= 0 ? '+' : '-'} ${Math.abs(this.imag)}i`;
    }

    static fromArray(arr) {
        return arr.reduce((acc, [real, imag]) => acc.add(new Complex(real, imag)), new Complex(0, 0));
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const complexNumbers = [new Complex(1, 2), new Complex(3, 4), new Complex(-2, 1)];
    let result = new Complex(0, 0);

    for (let c of complexNumbers) {
        result = result.add(c.multiply(new Complex(2, -1)));
    }

    print(`Result after multiplying and adding: ${result.toString()}`);

    const asyncResult = Complex.fromArray([[2, 3], [1, -1], [5, 2]]);
    await sleep(1000);
    print(`Result from array: ${asyncResult.toString()}`);
})();
