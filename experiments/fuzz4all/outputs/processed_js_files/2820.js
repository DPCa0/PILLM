class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static identity(size) {
    const matrix = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      matrix.data[i][i] = 1;
    }
    return matrix;
  }

  map(callback) {
    return new Matrix(
      this.data.length,
      this.data[0].length,
      (r, c) => callback(this.data[r][c], r, c)
    );
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Incompatible matrix sizes');
    }
    const result = new Matrix(a.data.length, b.data[0].length);
    result.data = result.data.map((row, i) =>
      row.map(
        (_, j) =>
          a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
      )
    );
    return result;
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    const data = this.data;
    return {
      next() {
        if (row >= data.length) return { done: true };
        const value = data[row][col];
        if (++col >= data[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }
}

(async () => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const matrixA = new Matrix(2, 3, (r, c) => r * 3 + c + 1);
  const matrixB = new Matrix(3, 2, (r, c) => r + c + 1);
  const result = Matrix.multiply(matrixA, matrixB);
  
  print('Matrix A:');
  for (let value of matrixA) print(value);
  
  print('\nMatrix B:');
  for (let value of matrixB) print(value);
  
  print('\nMultiplication Result:');
  for (let value of result) print(value);

  await delay(1000