class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }

  static fromArray(arr) {
    let matrix = new Matrix(arr.length, arr[0].length);
    matrix.data = arr;
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  print() {
    console.table(this.data);
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrix sizes');
    let result = new Matrix(a.data.length, b.data[0].length);
    result.map((_, i, j) => a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0));
    return result;
  }
}

const asyncOperation = async (matrix, delay) => {
  print(`Starting operation with delay: ${delay}ms`);
  await new Promise(resolve => setTimeout(resolve, delay));
  return matrix.map(val => val + 1);
};

(async () => {
  const matA = Matrix.fromArray([[1, 2], [3, 4]]);
  const matB = Matrix.fromArray([[5, 6], [7, 8]]);
  const result = Matrix.multiply(matA, matB);
  
  print('Initial multiplication result:');
  result.print();

  const modifiedMatrix = await asyncOperation(result, 1000);

  print('Modified matrix after async operation:');
  modifiedMatrix.print();
})();
