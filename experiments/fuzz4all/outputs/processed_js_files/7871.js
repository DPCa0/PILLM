 
class Complex {
    #real;  
    #imaginary;  
    
    constructor(real, imaginary) {
        this.#real = real;
        this.#imaginary = imaginary;
    }

     
    static add(c1, c2) {
        return new Complex(c1.#real + c2.#real, c1.#imaginary + c2.#imaginary);
    }

     
    get magnitude() {
        return Math.sqrt(this.#real ** 2 + this.#imaginary ** 2);
    }

     
    *[Symbol.iterator]() {
        yield this.#real;
        yield this.#imaginary;
    }

     
    toString() {
        return `${this.#real} + ${this.#imaginary}i`;
    }
}

 
async function processComplexNumbers() {
    const c1 = new Complex(3, 4);
    const c2 = new Complex(1, 2);

    print(`C1: ${c1}`);
    print(`C2: ${c2}`);

    const c3 = Complex.add(c1, c2);
    print(`C1 + C2: ${c3}`);
    
    print(`Magnitude of C1: ${c1.magnitude}`);

     
    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(c3.magnitude);
        }, 1000);
    });

    print(`Magnitude of C1 + C2 (async): ${result}`);
    
     
    print('Iterating over C1:');
    for (const part of c1) {
        print(part);
    }
}

 
processComplexNumbers();
