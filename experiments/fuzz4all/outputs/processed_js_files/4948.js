class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  multiply(matrixB) {
    if (this.data[0].length !== matrixB.data.length) throw new Error("Invalid matrix dimensions");
    let result = new Matrix(this.data.length, matrixB.data[0].length);
    return result.map((_, i, j) =>
      this.data[i].reduce((sum, el, k) => sum + el * matrixB.data[k][j], 0)
    );
  }

  log() {
    console.table(this.data);
  }
}

 
(async () => {
  const matrixA = new Matrix(2, 3).map((_, i, j) => i * 3 + j + 1);
  const matrixB = new Matrix(3, 2).map((_, i, j) => i * 2 + j + 1);

  print('Matrix A:');
  matrixA.log();
  
  print('Matrix B:');
  matrixB.log();
  
  const resultMatrix = matrixA.multiply(matrixB);
  print('Resulting Matrix after Multiplication:');
  resultMatrix.log();

   
  await new Promise(resolve => setTimeout(resolve, 1000));
  print(`Calculation completed asynchronously after 1 second.`);
})();
