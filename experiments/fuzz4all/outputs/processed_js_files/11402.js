class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromDimensions(rows, cols, fillValue = 0) {
    return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(fillValue)));
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield row;
    }
  }

  map(callback) {
    return new Matrix(this.data.map((row, rowIndex) => row.map((value, colIndex) => callback(value, rowIndex, colIndex))));
  }

  forEach(callback) {
    this.data.forEach((row, rowIndex) => row.forEach((value, colIndex) => callback(value, rowIndex, colIndex)));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error("Incompatible matrices");

    return Matrix.fromDimensions(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, element, k) => sum + element * b.data[k][j], 0)
    );
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const a = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

const b = new Matrix([
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
]);

const result = Matrix.multiply(a, b);
print(result.toString());
