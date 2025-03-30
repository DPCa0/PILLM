class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    return new Matrix(arr.length, arr[0].length).map((_, i, j) => arr[i][j]);
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  multiply(matrixB) {
    if (this.data[0].length !== matrixB.data.length) throw new Error('Matrix dimensions do not match for multiplication.');
    return new Matrix(this.data.length, matrixB.data[0].length).map((_, i, j) => {
      return this.data[i].reduce((sum, val, k) => sum + val * matrixB.data[k][j], 0);
    });
  }

  print() {
    console.table(this.data);
  }
}

const matrixA = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
const matrixB = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);

const result = matrixA.multiply(matrixB);
result.print();
