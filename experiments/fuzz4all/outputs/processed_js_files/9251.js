class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({ real, imaginary }) {
        return new Complex(this.real + real, this.imaginary + imaginary);
    }

    subtract({ real, imaginary }) {
        return new Complex(this.real - real, this.imaginary - imaginary);
    }

    magnitude() {
        return Math.sqrt(this.real ** 2 + this.imaginary ** 2);
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }

    static fromPolar({ magnitude, angle }) {
        return new Complex(
            magnitude * Math.cos(angle),
            magnitude * Math.sin(angle)
        );
    }
}

 
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
async function getRandomJoke() {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await response.json();
    return data.value;
}

 
const complexNumbers = [
    new Complex(3, 4),
    new Complex(1, 2),
    new Complex(5, -6),
];

const magnitudes = complexNumbers.map(({ real, imaginary }) =>
    Math.sqrt(real ** 2 + imaginary ** 2)
);

const uniqueMagnitudes = new Set(magnitudes);

(async () => {
    const fib = fibonacci();
    print('First five Fibonacci numbers:', [...Array(5)].map(() => fib.next().value));

    print('Magnitudes of complex numbers:', [...uniqueMagnitudes]);

    const joke = await getRandomJoke();
    print('Random Joke:', joke);
})();
