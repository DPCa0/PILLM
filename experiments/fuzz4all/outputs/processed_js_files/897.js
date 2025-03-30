class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
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

  static multiply(m1, m2) {
    if (m1.cols !== m2.rows) {
      throw new Error("Columns of A must match rows of B");
    }
    return new Matrix(m1.rows, m2.cols).map((_, i, j) =>
      m1.data[i].reduce((sum, element, k) => sum + element * m2.data[k][j], 0)
    );
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    const matrix = this;
    return {
      next() {
        if (row < matrix.rows && col < matrix.cols) {
          const value = matrix.data[row][col++];
          if (col === matrix.cols) {
            col = 0;
            row++;
          }
          return { value, done: false };
        }
        return { done: true };
      },
    };
  }
}

 
const a = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6],
]);

const b = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12],
]);

const result = Matrix.multiply(a, b);

for (let value of result) {
  print(value);
}
