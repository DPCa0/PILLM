class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }

  static identity(size) {
    const identity = new Matrix(size, size);
    for (let i = 0; i < size; i++) identity.data[i][i] = 1;
    return identity;
  }

  map(func) {
    return new Matrix(this.data.length, this.data[0].length)
      .apply((_, row, col) => func(this.data[row][col], row, col));
  }

  apply(func) {
    this.data.forEach((row, r) => row.forEach((value, c) => {
      this.data[r][c] = func(value, r, c);
    }));
    return this;
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error('Matrix dimensions do not match for multiplication.');
    }
    return new Matrix(this.data.length, matrix.data[0].length)
      .apply((_, row, col) => this.data[row].reduce((sum, elm, i) => sum + (elm * matrix.data[i][col]), 0));
  }

  print() {
    print(this.data.map(row => row.join('\t')).join('\n'));
  }
}

 
const matrixA = new Matrix(3, 3).apply(() => Math.floor(Math.random() * 10));
const matrixB = Matrix.identity(3);

print('Matrix A:');
matrixA.print();

print('\nMatrix B (Identity):');
matrixB.print();

print('\nA * B:');
matrixA.multiply(matrixB).print();
