class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => typeof fill === 'function' ? fill() : fill)
    );
  }

  static randomize(matrix) {
    matrix.data = matrix.data.map(row => row.map(() => Math.random()));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    return new Matrix(a.rows, b.cols).map((_, i, j) => 
      a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0)
    );
  }

  map(callback) {
    this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  log() {
    console.table(this.data);
    return this;
  }
}

const matrixA = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
const matrixB = new Matrix(3, 2, () => Math.floor(Math.random() * 10));

print('Matrix A:');
matrixA.log();

print('Matrix B:');
matrixB.log();

const matrixC = Matrix.multiply(matrixA, matrixB);

print('Matrix A * B:');
matrixC.log();
