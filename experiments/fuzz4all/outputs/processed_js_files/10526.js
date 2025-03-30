class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }
  
  static fromArray(arr) {
    let matrix = new Matrix(arr.length, arr[0].length);
    matrix.data = arr.map(row => [...row]);
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');
    return new Matrix(a.data.length, b.data[0].length)
      .map((_, i, j) => a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

(async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const matrixA = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  const matrixB = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
  ]);

  print('Matrix A:');
  print(matrixA.toString());
  print('\nMatrix B:');
  print(matrixB.toString());

  print('\nMultiplying A and B...\n');
  await sleep(2000);

  try {
    const matrixC = Matrix.multiply(matrixA, matrixB);
    print('Result Matrix C:');
    print(matrixC.toString());
  } catch (error) {
    console.error(error.message);
  }
})();
