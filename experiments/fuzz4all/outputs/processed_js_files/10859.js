class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  static fromArray(arr) {
    return new Matrix(arr.length, arr[0].length).map((_, i, j) => arr[i][j]);
  }

  map(func) {
    this.data = this.data.map((row, i) =>
      row.map((val, j) => func(val, i, j))
    );
    return this;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    return new Matrix(a.rows, b.cols).map(
      (_, i, j) => a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
    );
  }

  toArray() {
    return this.data.reduce((arr, row) => arr.concat(row), []);
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }
}

 
const A = Matrix.fromArray([
  [1, 2],
  [3, 4],
]);

const B = Matrix.fromArray([
  [5, 6],
  [7, 8],
]);

const C = Matrix.multiply(A, B);
print('Matrix A:', A.toArray());
print('Matrix B:', B.toArray());
print('A * B =', C.toArray());

const I = Matrix.identity(3);
print('Identity Matrix:', I.toArray());
