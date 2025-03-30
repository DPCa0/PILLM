class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(dimensions, initializer = () => 0) {
    return new Matrix(Array.from({ length: dimensions[0] },
        () => Array.from({ length: dimensions[1] }, initializer)));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length)
      throw new Error('Incompatible matrices for multiplication');
    return Matrix.from([a.data.length, b.data[0].length], (val, i, j) =>
      a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0));
  }

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
const A = Matrix.from([2, 3], (val, i, j) => i * 3 + j + 1);
const B = Matrix.from([3, 2], (val, i, j) => (i + 1) * (j + 2));

print('Matrix A:');
print(A.toString());

print('Matrix B:');
print(B.toString());

const C = Matrix.multiply(A, B);
print('Matrix C (A * B):');
print(C.toString());
