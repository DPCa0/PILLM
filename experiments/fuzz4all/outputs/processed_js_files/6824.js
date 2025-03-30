class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromSize(rows, cols, fill = 0) {
    return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(fill)));
  }

  map(callback) {
    return new Matrix(this.data.map((row, rowIndex) =>
      row.map((value, colIndex) => callback(value, rowIndex, colIndex))
    ));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error("Matrix dimensions do not match for multiplication");
    return new Matrix(a.data.map((row, i) =>
      b.data[0].map((_, j) =>
        row.reduce((sum, val, k) => sum + val * b.data[k][j], 0)
      )
    ));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

async function delayedMultiply(matrixA, matrixB, delay) {
  const delayedMultiplication = () => new Promise(resolve => 
    setTimeout(() => resolve(Matrix.multiply(matrixA, matrixB)), delay)
  );
  print('Calculating multiplication...');
  const result = await delayedMultiplication();
  print('Result:\n', result.toString());
}

const a = Matrix.fromSize(2, 3).map((_, i, j) => i * 3 + j + 1);
const b = Matrix.fromSize(3, 2).map((_, i, j) => i * 2 + j + 1);

(async () => {
  print('Matrix A:\n', a.toString());
  print('Matrix B:\n', b.toString());
  await delayedMultiply(a, b, 1000);
})();
