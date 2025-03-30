class Complex {
    #real;
    #imaginary;

    constructor(real, imaginary) {
        this.#real = real;
        this.#imaginary = imaginary;
    }

    get real() {
        return this.#real;
    }

    get imaginary() {
        return this.#imaginary;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'string') {
            return `${this.real} + ${this.imaginary}i`;
        }
        return this.magnitude();
    }

    magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    static *fibonacci(n) {
        let a = new Complex(0, 0), b = new Complex(1, 0);
        for (let i = 0; i < n; i++) {
            yield a;
            [a, b] = [b, new Complex(a.real + b.real, a.imaginary + b.imaginary)];
        }
    }

    static async fetchComplex(url) {
        try {
            let response = await fetch(url);
            let { real, imaginary } = await response.json();
            return new Complex(real, imaginary);
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

(async () => {
    print('Complex number example:');
    let complex = new Complex(3, 4);
    print(`Magnitude: ${+complex}`);
    print(`String representation: ${complex}`);

    print('\nFibonacci sequence of Complex numbers:');
    for (let num of Complex.fibonacci(5)) {
        print(num);
    }

    print('\nFetching a complex number from an API:');
    let fetchedComplex = await Complex.fetchComplex('https://api.example.com/complex');
    if (fetchedComplex) {
        print(`Fetched complex number: ${fetchedComplex}`);
    }
})();
