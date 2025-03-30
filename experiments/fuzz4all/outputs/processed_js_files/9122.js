class Matrix {
  constructor(rows, cols, fillFn) {
    this.data = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) => fillFn(i, j))
    );
  }

  static multiply(m1, m2) {
    if (m1.data[0].length !== m2.data.length) throw new Error('Incompatible matrices');
    return new Matrix(m1.data.length, m2.data[0].length, (i, j) =>
      m1.data[i].reduce((sum, _, k) => sum + m1.data[i][k] * m2.data[k][j], 0)
    );
  }
  
  map(fn) {
    return new Matrix(this.data.length, this.data[0].length, (i, j) => fn(this.data[i][j], i, j));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const identity = new Matrix(3, 3, (i, j) => (i === j ? 1 : 0));
const randomMatrix = new Matrix(3, 3, () => Math.floor(Math.random() * 10));

const multipliedMatrix = Matrix.multiply(identity, randomMatrix);
const transformedMatrix = multipliedMatrix.map((val) => val * 2);

print('Random Matrix:\n', randomMatrix.toString());
print('Multiplied Matrix:\n', multipliedMatrix.toString());
print('Transformed Matrix:\n', transformedMatrix.toString());
