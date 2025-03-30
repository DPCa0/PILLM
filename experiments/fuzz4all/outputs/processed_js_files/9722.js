class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static multiply(m1, m2) {
    if (m1.data[0].length !== m2.data.length) {
      throw new Error('Matrices dimensions are not suitable for multiplication.');
    }
    let result = new Matrix(m1.data.length, m2.data[0].length);
    result.data = result.data.map((row, i) =>
      row.map((_, j) =>
        m1.data[i].reduce((sum, elm, k) => sum + elm * m2.data[k][j], 0)
      )
    );
    return result;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function asyncOperation(matrixA, matrixB) {
  try {
    print('Calculating...');
    await delay(1000);
    const result = Matrix.multiply(matrixA, matrixB);
    print('Result:', result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const matrix1 = new Matrix(2, 3, 2);
const matrix2 = new Matrix(3, 2, 3);

asyncOperation(matrix1, matrix2);
