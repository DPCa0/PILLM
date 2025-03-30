class Matrix {
  constructor(rows, cols, fillValue = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fillValue)
    );
  }

  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  map(func) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => func(value, i, j))
    );
    return this;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Columns of A must match rows of B.");
    }
    const result = new Matrix(a.data.length, b.data[0].length);
    return result.map((_, i, j) =>
      a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
    );
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

const example1 = Matrix.fromArray([
  [1, 2],
  [3, 4],
  [5, 6]
]);
const example2 = Matrix.fromArray([
  [7, 8, 9],
  [10, 11, 12]
]);

const result = Matrix.multiply(example1, example2);
print(`Result of Matrix multiplication:\n${result.toString()}`);

const transposed = transpose([[1, 2, 3], [4, 5, 6]]);
print(`Transposed matrix:\n${transposed.map(row => row.join('\t')).join('\n')}`);
