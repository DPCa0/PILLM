class Matrix {
  constructor(rows, cols, fillFunc = () => 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, fillFunc)
    );
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Incompatible matrices for multiplication');
    }
    return new Matrix(a.data.length, b.data[0].length, (_, row, col) =>
      a.data[row].reduce((sum, val, i) => sum + val * b.data[i][col], 0)
    );
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  static async addAsync(a, b) {
    if (
      a.data.length !== b.data.length ||
      a.data[0].length !== b.data[0].length
    ) {
      throw new Error('Incompatible matrices for addition');
    }
    const result = new Matrix(a.data.length, a.data[0].length);
    await Promise.all(
      a.data.map((row, i) =>
        Promise.all(
          row.map((val, j) => (result.data[i][j] = val + b.data[i][j]))
        )
      )
    );
    return result;
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
(async () => {
  const matA = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
  const matB = new Matrix(3, 2, () => Math.floor(Math.random() * 10));

  print('Matrix A:');
  print(matA.toString());
  print('\nMatrix B:');
  print(matB.toString());

  const product = Matrix.multiply(matA, matB);
  print('\nProduct of A and B:');
  print(product.toString());

  const matC = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
  print('\nMatrix C:');
  print(matC.toString());

  const sum = await Matrix.addAsync(matA, matC);
  print('\nSum of A and C:');
  print(sum.toString());

  console.log('\nIterating