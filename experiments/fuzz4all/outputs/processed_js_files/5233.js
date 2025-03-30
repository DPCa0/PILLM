class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }
  
  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B.");
    return new Matrix(a.rows, b.cols).map((_, i, j) => {
      return a.data[i].reduce((sum, _, k) => sum + a.data[i][k] * b.data[k][j], 0);
    });
  }

  map(func) {
    this.data = this.data.map((row, i) => row.map((value, j) => func(value, i, j)));
    return this;
  }

  randomize() {
    return this.map(() => Math.random() * 2 - 1);
  }

  print() {
    console.table(this.data);
    return this;
  }
}

function asyncMatrixMultiplicationDemo() {
  const matrixA = new Matrix(3, 2).randomize();
  const matrixB = new Matrix(2, 3).randomize();
  
  print('Matrix A:');
  matrixA.print();
  
  print('Matrix B:');
  matrixB.print();
  
  Promise.resolve()
    .then(() => {
      const result = Matrix.multiply(matrixA, matrixB);
      print('A * B:');
      result.print();
    })
    .catch(err => console.error('Error in multiplication:', err));
}

asyncMatrixMultiplicationDemo();
