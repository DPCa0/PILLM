class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(size, fillValue = 0) {
    return new Matrix(Array.from({ length: size }, () => Array(size).fill(fillValue)));
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => callback(value, i, j))));
  }

  static multiply(m1, m2) {
    if (m1.data[0].length !== m2.data.length) throw new Error('Incompatible matrix sizes for multiplication');
    return new Matrix(
      m1.data.map((row, i) => 
        m2.data[0].map((_, j) => 
          row.reduce((sum, _, k) => sum + m1.data[i][k] * m2.data[k][j], 0)
        )
      )
    );
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

const randomFill = (size) => new Matrix(Array.from({ length: size }, () => Array.from({ length: size }, () => Math.floor(Math.random() * 10))));

(async () => {
  const [matrix1, matrix2] = await Promise.all([randomFill(3), randomFill(3)]);
  print('Matrix 1:\n', matrix1.toString());
  print('Matrix 2:\n', matrix2.toString());

  const result = Matrix.multiply(matrix1, matrix2);
  print('Result of multiplication:\n', result.toString());
})();
