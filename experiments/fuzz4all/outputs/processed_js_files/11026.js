class Matrix {
  constructor(data) {
    this.data = data;
  }
  
  static fromArray(arr) {
    const size = Math.sqrt(arr.length);
    if (size % 1 !== 0) throw new Error('Array length must be a perfect square');
    return new Matrix([...Array(size)].map((_, i) => arr.slice(i * size, (i + 1) * size)));
  }

  *[Symbol.iterator]() {
    for (const row of this.data) {
      for (const cell of row) {
        yield cell;
      }
    }
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((cell, j) => fn(cell, i, j))));
  }

  transpose() {
    const size = this.data.length;
    const transposed = Array.from({ length: size }, () => Array(size));
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        transposed[j][i] = this.data[i][j];
      }
    }
    return new Matrix(transposed);
  }

  print() {
    print(this.data.map(row => row.join(' ')).join('\n'));
  }
}

 
const squareNumbers = [...Array(16).keys()].map(x => x + 1);
const matrix = Matrix.fromArray(squareNumbers);

print('Original Matrix:');
matrix.print();

print('\nTransposed Matrix:');
matrix.transpose().print();

print('\nDoubled Matrix:');
matrix.map(x => x * 2).print();

print('\nIterating over the Matrix:');
for (const value of matrix) {
  process.stdout.write(value + ' ');
}
