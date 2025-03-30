class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    const m = new Matrix(arr.length, arr[0].length);
    m.map((_, i, j) => arr[i][j]);
    return m;
  }

  map(func) {
    this.data = this.data.map((row, i) => row.map((val, j) => func(val, i, j)));
    return this;
  }

  multiply(b) {
    if (b instanceof Matrix) {
      if (this.data[0].length !== b.data.length)
        throw new Error('Columns of A must match rows of B.');
      return new Matrix(this.data.length, b.data[0].length)
        .map((_, i, j) => 
          this.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
        );
    } else {
      return this.map(val => val * b);
    }
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  log() {
    console.table(this.data);
  }
}

 
const a = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const b = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const identityMatrix = Matrix.identity(3);

print('Matrix A:');
a.log();
print('Matrix B:');
b.log();
print('A * B:');
a.multiply(b).log();
print('Identity Matrix:');
identityMatrix.log();
