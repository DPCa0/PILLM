class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static from(array) {
    const matrix = new Matrix(array.length, array[0].length);
    matrix.map((_, i, j) => array[i][j]);
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((value, j) => fn(value, i, j)));
    return this;
  }

  print() {
    console.table(this.data);
  }
}

class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(other) {
    return new ComplexNumber(this.real + other.real, this.imaginary + other.imaginary);
  }

  multiply(other) {
    const realPart = this.real * other.real - this.imaginary * other.imaginary;
    const imaginaryPart = this.real * other.imaginary + this.imaginary * other.real;
    return new ComplexNumber(realPart, imaginaryPart);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

 
const computeComplexMatrix = async () => {
  const matrix = new Matrix(3, 3);
  matrix.map(() => new ComplexNumber(Math.random(), Math.random()));

  await new Promise((resolve) => setTimeout(resolve, 1000));  

  return matrix.map((value) => value.multiply(new ComplexNumber(2, 3)));
};

(async () => {
  try {
    const complexMatrix = await computeComplexMatrix();
    complexMatrix.print();
  } catch (error) {
    console.error("Error computing complex matrix:", error);
  }
})();
