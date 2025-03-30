 
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      return `${this.real} + ${this.imaginary}i`;
    }
    return this.real;
  }

  add({real, imaginary}) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }

  multiply({real, imaginary}) {
    const r = this.real * real - this.imaginary * imaginary;
    const i = this.real * imaginary + this.imaginary * real;
    return new ComplexNumber(r, i);
  }
}

const asyncOp = async (num) => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(new ComplexNumber(num, num)), 100)
  );
};

const complexOps = async () => {
  const [c1, c2] = await Promise.all([asyncOp(3), asyncOp(4)]);
  const sum = c1.add(c2);
  const product = c1.multiply(c2);

  print(`Sum: ${sum}`);        
  print(`Product: ${product}`);
};

const handleErrors = async (fn) => {
  try {
    await fn();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

handleErrors(complexOps);
