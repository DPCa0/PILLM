class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }
  
  static from({ real, imaginary }) {
    return new ComplexNumber(real, imaginary);
  }
  
  toString() {
    return `${this.real} ${this.imaginary < 0 ? '-' : '+'} ${Math.abs(this.imaginary)}i`;
  }
  
  add({ real, imaginary }) {
    return ComplexNumber.from({ real: this.real + real, imaginary: this.imaginary + imaginary });
  }
  
  subtract({ real, imaginary }) {
    return ComplexNumber.from({ real: this.real - real, imaginary: this.imaginary - imaginary });
  }
  
  multiply({ real, imaginary }) {
    return ComplexNumber.from({
      real: this.real * real - this.imaginary * imaginary,
      imaginary: this.real * imaginary + this.imaginary * real
    });
  }
  
  divide({ real, imaginary }) {
    const denominator = real * real + imaginary * imaginary;
    return ComplexNumber.from({
      real: (this.real * real + this.imaginary * imaginary) / denominator,
      imaginary: (this.imaginary * real - this.real * imaginary) / denominator
    });
  }
}

 
async function asyncComplexOperations(a, b) {
  print(`Complex A: ${a.toString()}`);
  print(`Complex B: ${b.toString()}`);
  
  const result = await new Promise(resolve => {
    setTimeout(() => {
      const sum = a.add(b);
      const product = a.multiply(b);
      resolve({ sum, product });
    }, 1000);
  });
  
  print(`Sum: ${result.sum.toString()}`);
  print(`Product: ${result.product.toString()}`);
}

 
const complexA = new ComplexNumber(3, 4);
const complexB = new ComplexNumber(1, -2);
asyncComplexOperations(complexA, complexB);
