class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static random(rows, cols) {
    const matrix = new Matrix(rows, cols);
    matrix.map(() => Math.random());
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => fn(value, i, j))
    );
    return this;
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error('Incompatible matrix sizes for multiplication');
    }
    return new Matrix(this.data.length, matrix.data[0].length).map(
      (_, i, j) =>
        this.data[i].reduce(
          (sum, elm, k) => sum + elm * matrix.data[k][j],
          0
        )
    );
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  toString() {
    return this.data.map(row => row.join(', ')).join('\n');
  }
}

 
const A = Matrix.random(3, 3);
const I = Matrix.identity(3);
const result = A.multiply(I);

print('Matrix A:');
print(A.toString());
print('\nIdentity Matrix:');
print(I.toString());
print('\nA * I:');
print(result.toString());
