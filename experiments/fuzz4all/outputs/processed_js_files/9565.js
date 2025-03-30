 
class Complex {
    #real;
    #imaginary;
    
    constructor(real, imaginary) {
        this.#real = real;
        this.#imaginary = imaginary;
    }
    
     
    #formatNumber(num) {
        return num.toFixed(2);
    }
    
     
    getDisplayString = () => {
        const real = this.#formatNumber(this.#real);
        const imaginary = this.#formatNumber(this.#imaginary);
        const sign = this.#imaginary >= 0 ? '+' : '-';
        return `${real} ${sign} ${Math.abs(imaginary)}i`;
    }

     
    static parseComplex(complexString) {
        const matches = complexString.match(/([+-]?\d*\.?\d+)([+-]\d*\.?\d+)i/) || [];
        const [, real, imaginary] = matches;
        return new Complex(Number(real ?? 0), Number(imaginary ?? 0));
    }
}

 
const complexNumber = new Complex(3.14159, 2.71828);
print(complexNumber.getDisplayString());  

 
const parsedComplex = Complex.parseComplex("4.20-5.00i");
print(parsedComplex.getDisplayString());  

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demonstrateAsync() {
    print('Start');
    await delay(1000);  
    print('After 1 second');
}

demonstrateAsync();
