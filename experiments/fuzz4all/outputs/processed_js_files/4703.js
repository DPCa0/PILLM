class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static identity(size) {
    const matrix = new Matrix(size, size);
    matrix.data.forEach((row, i) => {
      row[i] = 1;
    });
    return matrix;
  }

  static multiply(A, B) {
    if (A.data[0].length !== B.data.length) throw new Error('Invalid matrices for multiplication');
    return new Matrix(A.data.length, B.data[0].length).map((_, i, j) =>
      A.data[i].reduce((sum, el, k) => sum + el * B.data[k][j], 0)
    );
  }

  map(fn) {
    this.data = this.data.map((row, i) =>
      row.map((val, j) => fn(val, i, j))
    );
    return this;
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

(async function main() {
  const A = new Matrix(2, 3, 1);
  const B = new Matrix(3, 2, 2);
  const I = Matrix.identity(2);

  print('Matrix A:\n', A.toString());
  print('\nMatrix B:\n', B.toString());
  print('\nIdentity Matrix:\n', I.toString());

  const C = Matrix.multiply(A, B);
  print('\nA * B:\n', C.toString());

   
  const delay = ms => new Promise(res => setTimeout(res, ms));

  await delay(1000);
  print('\nDone after 1 second');
})();
