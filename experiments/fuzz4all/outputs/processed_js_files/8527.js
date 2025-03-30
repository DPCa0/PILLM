 

class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add({ real, imaginary }) {
    return new ComplexNumber(this.real + real, this.imaginary + imaginary);
  }

  subtract({ real, imaginary }) {
    return new ComplexNumber(this.real - real, this.imaginary - imaginary);
  }

  toString() {
    return `${this.real} ${this.imaginary < 0 ? '-' : '+'} ${Math.abs(this.imaginary)}i`;
  }
}

const asyncProcessComplexNumbers = async (complexNumbers) => {
  const operations = complexNumbers.map(async (num, index) => {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    return num.add(complexNumbers[index % complexNumbers.length]);
  });

  const results = await Promise.all(operations);
  return results.map(num => num.toString());
};

const complexNumbers = [
  new ComplexNumber(2, 3),
  new ComplexNumber(4, -5),
  new ComplexNumber(1, 1)
];

(async () => {
  print('Processing complex numbers...');
  const results = await asyncProcessComplexNumbers(complexNumbers);
  print('Results:', results.join('; '));
})();
