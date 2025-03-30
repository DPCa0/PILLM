class Matrix {
  constructor(rows, cols, fillFunction = () => Math.random()) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, fillFunction));
  }

  static add(matrixA, matrixB) {
    if (matrixA.rows !== matrixB.rows || matrixA.cols !== matrixB.cols) {
      throw new Error("Matrices must have the same dimensions to add.");
    }
    return new Matrix(matrixA.rows, matrixA.cols, (i, j) => 
      matrixA.data[i][j] + matrixB.data[i][j]
    );
  }

  map(callback) {
    return new Matrix(this.rows, this.cols, (i, j) => 
      callback(this.data[i][j], i, j)
    );
  }

  log() {
    console.table(this.data);
  }
}

 
(async function() {
  const matrixA = new Matrix(3, 3, () => Math.floor(Math.random() * 10));
  const matrixB = new Matrix(3, 3, () => Math.floor(Math.random() * 10));
  
  print("Matrix A:");
  matrixA.log();
  
  print("Matrix B:");
  matrixB.log();
  
  let result = await Promise.resolve(Matrix.add(matrixA, matrixB));
  print("Matrix A + Matrix B:");
  result.log();
  
  result = await result.map(value => value * 2);
  print("Doubled Result:");
  result.log();
})();
