class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  toArray() {
    return this.data;
  }

  map(func) {
    this.data = this.data.map((row, i) =>
      row.map((val, j) => func(val, i, j))
    );
    return this;
  }

  multiply(other) {
    if (this.cols !== other.rows) throw new Error("Columns of A must match rows of B.");
    return Matrix.fromArray(
      this.data.map((row, i) =>
        other.data[0].map((_, j) =>
          row.reduce((sum, _, n) => sum + this.data[i][n] * other.data[n][j], 0)
        )
      )
    );
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  log() {
    console.table(this.data);
    return this;
  }
}

 
const a = new Matrix(2, 3).map((_, i, j) => i + j);
const b = new Matrix(3, 2).map((_, i, j) => i * j);
const c = a.multiply(b);

print("Matrix A:");
a.log();
print("Matrix B:");
b.log();
print("Product C:");
c.log();

const idMatrix = Matrix.identity(4);
print("Identity Matrix:");
idMatrix.log();
