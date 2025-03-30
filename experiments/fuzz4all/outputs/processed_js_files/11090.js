class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromDimensions(rows, cols, fillValue = 0) {
    return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(fillValue)));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
  }

  reduce(fn, initial) {
    return this.data.reduce((acc, row) => row.reduce(fn, acc), initial);
  }

  transpose() {
    return new Matrix(this.data[0].map((_, colIndex) => this.data.map(row => row[colIndex])));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Incompatible dimensions');
    return new Matrix(
      a.data.map(row => b.transpose().data.map(col => row.reduce((sum, value, index) => sum + value * col[index], 0)))
    );
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
const handler = {
  get: (obj, prop) => (typeof prop === 'string' && prop.match(/^\d+,\d+$/))
    ? obj.data[prop.split(',')[0]][prop.split(',')[1]]
    : obj[prop]
};

 
const matrixA = new Matrix([[1, 2], [3, 4]]);
const matrixB = Matrix.fromDimensions(2, 2, 5);
const matrixC = Matrix.multiply(matrixA, matrixB);
const proxyMatrix = new Proxy(matrixC, handler);

print('Matrix A:\n' + matrixA.toString());
print('Matrix B:\n' + matrixB.toString());
print('Matrix C (A * B):\n' + proxyMatrix.toString());
print('Element at (0,1):', proxyMatrix['0,1']);
