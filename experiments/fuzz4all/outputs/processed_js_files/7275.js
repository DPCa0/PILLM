class Matrix {
  constructor(rows, cols) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
  }
  
  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B');
    let result = new Matrix(a.data.length, b.data[0].length);
    
    result.data = result.data.map((row, i) =>
      row.map((_, j) =>
        a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
      )
    );
    return result;
  }
  
  static identity(size) {
    let id = new Matrix(size, size);
    id.data = id.data.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
    return id;
  }
  
  static random(rows, cols, min = 0, max = 10) {
    let matrix = new Matrix(rows, cols);
    matrix.data = matrix.data.map(row => row.map(() => Math.floor(Math.random() * (max - min + 1)) + min));
    return matrix;
  }
  
  log() {
    console.table(this.data);
  }
}

(async () => {
  let A = Matrix.random(3, 3, 1, 5);
  let B = Matrix.random(3, 3, 1, 5);
  let I = Matrix.identity(3);
  
  print('Matrix A:');
  A.log();
  print('Matrix B:');
  B.log();
  
  print('A * B:');
  let AB = Matrix.multiply(A, B);
  AB.log();
  
  print('A * I (should be A):');
  let AI = Matrix.multiply(A, I);
  AI.log();
})();
