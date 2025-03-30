class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random()));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    let result = new Matrix(a.rows, b.cols);
    result.data = result.data.map((row, i) =>
      row.map((_, j) => a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0))
    );
    return result;
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row >= this.rows) return { done: true };
        const value = this.data[row][col];
        col++;
        if (col >= this.cols) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }

  log() {
    console.table(this.data);
  }
}

(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const matrix1 = new Matrix(3, 2);
  const matrix2 = new Matrix(2, 3);

  print('Matrix 1:');
  matrix1.log();

  await delay(1000);  

  print('Matrix 2:');
  matrix2.log();

  const result = Matrix.multiply(matrix1, matrix2);
  print('Result of Multiplication:');
  result.log();

  print('Iterating over Result Matrix:');
  for (const value of result) {
    print(value.toFixed(2));
  }
})();
