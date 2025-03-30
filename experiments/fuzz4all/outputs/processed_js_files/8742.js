class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    let matrix = new Matrix(arr.length, arr[0].length);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B');
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0)
    );
  }

  [Symbol.iterator]() {
    let row = 0, col = 0, rows = this.data.length, cols = this.data[0].length;
    return {
      next: () => {
        if (row < rows && col < cols) {
          let value = this.data[row][col++];
          if (col === cols) { row++; col = 0; }
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }

  log() {
    console.table(this.data);
  }
}

 
const identity = Matrix.fromArray([[1, 0], [0, 1]]);
const randomMatrix = new Matrix(2, 2).map(() => Math.random());
const result = Matrix.multiply(identity, randomMatrix);
for (const value of result) {
  print('Matrix Element:', value.toFixed(2));
}
result.log();
