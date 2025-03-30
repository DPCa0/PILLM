class Complex {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }
  add({ re, im }) {
    return new Complex(this.re + re, this.im + im);
  }
  multiply({ re, im }) {
    return new Complex(
      this.re * re - this.im * im,
      this.re * im + this.im * re
    );
  }
  toString() {
    const sign = this.im >= 0 ? '+' : '-';
    return `${this.re} ${sign} ${Math.abs(this.im)}i`;
  }
}

async function* generateComplexNumbers(count) {
  for (let i = 0; i < count; i++) {
    yield new Complex(Math.random() * 10, Math.random() * 10);
  }
}

(async () => {
  const complexNumbers = [];
  for await (let number of generateComplexNumbers(5)) {
    complexNumbers.push(number);
  }
  
  const [first, second] = complexNumbers;

  const sum = first.add(second);
  const product = first.multiply(second);

  print(`First: ${first.toString()}`);
  print(`Second: ${second.toString()}`);
  print(`Sum: ${sum.toString()}`);
  print(`Product: ${product.toString()}`);
})();
