class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => defaultValue));
  }

  static fromArray(arr) {
    const m = new Matrix(arr.length, arr[0].length);
    m.data = arr;
    return m;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B');
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
    );
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  log() {
    console.table(this.data);
    return this;
  }
}

const matrixA = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const matrixB = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const result = Matrix.multiply(matrixA, matrixB).log();
