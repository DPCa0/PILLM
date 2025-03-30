class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(array) {
    const rows = array.length;
    const cols = array[0].length;
    const m = new Matrix(rows, cols);
    m.data = array;
    return m;
  }

  map(func) {
    this.data = this.data.map((row, i) =>
      row.map((val, j) => func(val, i, j))
    );
    return this;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B.');
    }
    return new Matrix(a.data.length, b.data[0].length)
      .map((_, i, j) =>
        a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
      );
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    const data = this.data;
    return {
      next() {
        if (row >= data.length) return { done: true };
        const value = data[row][col];
        col++;
        if (col >= data[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }
}

(async () => {
  const matrix1 = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  const matrix2 = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
  ]);

  const product = Matrix.multiply(matrix1, matrix2);

  print('Matrix multiplication result:');
  for (const value of product) {
    print(value);
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  print('Mapped matrix:');
  product.map((value) => value * 2);

  for (const value of product) {
    print(value);
  }
})();
