 

class Matrix {
  constructor(rows, cols, fillFunction = () => Math.random()) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, fillFunction));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B.");
    return new Matrix(a.rows, b.cols, () => 0).map((_, i, j) => 
      a.data[i].reduce((sum, _, n) => sum + a.data[i][n] * b.data[n][j], 0)
    );
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  log() {
    console.table(this.data);
  }
}

const asyncOperation = async (matrix, operation) => {
  print("Starting async operation...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const result = operation(matrix);
  print("Async operation complete:");
  result.log();
};

const main = async () => {
  const matrixA = new Matrix(3, 2);
  const matrixB = new Matrix(2, 3);

  print("Matrix A:");
  matrixA.log();
  print("Matrix B:");
  matrixB.log();

  await asyncOperation(Matrix.multiply(matrixA, matrixB), matrix => {
    return matrix.map(val => Math.round(val));
  });
};

main().catch(console.error);
