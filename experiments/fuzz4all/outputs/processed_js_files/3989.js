class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(m, n, fn) {
    return new Matrix(Array.from({ length: m }, (_, i) =>
      Array.from({ length: n }, (_, j) => fn(i, j))
    ));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  *[Symbol.iterator]() {
    for (let row of this.data) yield* row;
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

const applyOperator = (matA, matB, op) => 
  matA.map((val, i, j) => op(val, matB.data[i][j]));

const multiply = (matA, matB) =>
  Matrix.from(matA.data.length, matB.data[0].length, (i, j) =>
    matA.data[i].reduce((sum, _, k) => sum + matA.data[i][k] * matB.data[k][j], 0));

const matA = Matrix.from(3, 3, () => Math.floor(Math.random() * 10));
const matB = Matrix.from(3, 3, () => Math.floor(Math.random() * 10));

print('Matrix A:\n', matA.toString());
print('Matrix B:\n', matB.toString());

const sum = applyOperator(matA, matB, (a, b) => a + b);
const product = multiply(matA, matB);

print('Sum of A and B:\n', sum.toString());
print('Product of A and B:\n', product.toString());
