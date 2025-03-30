 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* fibonacciGen(max) {
    let a = 0, b = 1;
    while (a <= max) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({ real, imaginary }) {
        return new Complex(this.real + real, this.imaginary + imaginary);
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}

 
async function computeFibonacciAndComplex(maxFib, complexNums) {
    print("Starting calculations...");

     
    const fibNumbers = [];
    for (let num of fibonacciGen(maxFib)) {
        fibNumbers.push(num);
    }

     
    const complexOps = complexNums.map(async (comp, i) => {
        await delay(i * 100);  
        return complexNums.reduce((acc, val) => acc.add(val), new Complex(0, 0)).toString();
    });

    const complexResults = await Promise.all(complexOps);

    print("Fibonacci Numbers:", fibNumbers);
    print("Complex Calculations:", complexResults);
}

 
const complexNumbers = [
    new Complex(1, 2),
    new Complex(3, 4),
    new Complex(-5, 6)
];

 
computeFibonacciAndComplex(21, complexNumbers);
