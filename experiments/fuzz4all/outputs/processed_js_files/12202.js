class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static from2DArray(array) {
    const matrix = new Matrix(array.length, array[0].length);
    matrix.data = array;
    return matrix;
  }

  *[Symbol.iterator]() {
    for (const row of this.data) {
      yield* row;
    }
  }

  map(callback) {
    const result = new Matrix(this.data.length, this.data[0].length);
    result.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return result;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Matrix dimensions do not match for multiplication');
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
    );
  }
}

const matrixA = Matrix.from2DArray([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

const matrixB = Matrix.from2DArray([
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
]);

const resultMatrix = Matrix.multiply(matrixA, matrixB);
for (const value of resultMatrix) {
  print(value);
}
