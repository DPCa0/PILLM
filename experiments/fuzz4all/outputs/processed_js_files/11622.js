class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.rows) {
          if (col < this.cols) {
            return { value: this.data[row][col++], done: false };
          }
          col = 0;
          row++;
          if (row < this.rows) {
            return { value: this.data[row][col++], done: false };
          }
        }
        return { done: true };
      }
    };
  }

  static random(rows, cols, max = 10) {
    const matrix = new Matrix(rows, cols);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        matrix.data[i][j] = Math.floor(Math.random() * max);
      }
    }
    return matrix;
  }

  transpose() {
    const transposed = new Matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        transposed.data[j][i] = this.data[i][j];
      }
    }
    return transposed;
  }
}

 
async function asyncTranspose(matrix) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matrix.transpose());
    }, 1000);
  });
}

(async function() {
  const matrix = Matrix.random(3, 3);
  print('Original Matrix:');
  print(matrix.data);

  const transposed = await asyncTranspose(matrix);
  print('Transposed Matrix:');
  print(transposed.data);

  print('Iterating over transposed matrix:');
  for (const value of transposed) {
    print(value);
  }
})();
