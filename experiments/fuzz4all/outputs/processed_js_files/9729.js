class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
  }

  static identity(size) {
    return new Matrix(size, size, 0).map((_, i, j) => (i === j ? 1 : 0));
  }

  map(callback) {
    const result = new Matrix(this.data.length, this.data[0].length);
    result.data = this.data.map((row, i) => row.map((value, j) => callback(value, i, j)));
    return result;
  }

  static async multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');
    const result = new Matrix(a.data.length, b.data[0].length);
    await Promise.all(
      result.data.map((row, i) =>
        row.map(async (_, j) => {
          result.data[i][j] = await a.data[i].reduce(async (sum, value, k) => {
            return await sum + value * b.data[k][j];
          }, 0);
        })
      )
    );
    return result;
  }

  print() {
    console.table(this.data);
  }
}

(async () => {
  const matA = new Matrix(3, 3).map((_, i, j) => i * 3 + j + 1);
  const matB = Matrix.identity(3);
  const result = await Matrix.multiply(matA, matB);

  print("Matrix A:");
  matA.print();
  print("Identity Matrix B:");
  matB.print();
  print("Result of A * B:");
  result.print();
})();
