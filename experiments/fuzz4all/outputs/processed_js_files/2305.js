class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static multiply(m1, m2) {
    if (m1.data[0].length !== m2.data.length)
      throw new Error('Incompatible matrices');

    return new Matrix(m1.data.length, m2.data[0].length).map((_, i, j) =>
      m1.data[i].reduce((sum, elm, k) => sum + elm * m2.data[k][j], 0)
    );
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static fromArray(array) {
    return new Matrix(array.length, array[0].length).map((_, i, j) => array[i][j]);
  }
}

const m1 = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const m2 = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const resultMatrix = Matrix.multiply(m1, m2);

print('Resultant Matrix:');
console.table(resultMatrix.data);
