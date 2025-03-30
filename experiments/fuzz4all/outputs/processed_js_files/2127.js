(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class Matrix {
    constructor(rows, cols, defaultValue = 0) {
      this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    static multiply(a, b) {
      if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B');
      return new Matrix(a.data.length, b.data[0].length).map((_, i, j) => 
        a.data[i].reduce((sum, _, k) => sum + a.data[i][k] * b.data[k][j], 0)
      );
    }

    map(fn) {
      this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
      return this;
    }

    toString() {
      return this.data.map(row => row.join(' ')).join('\n');
    }
  }

  const asyncMatrixCalculation = async () => {
    const matrixA = new Matrix(2, 3, 2);
    const matrixB = new Matrix(3, 2, 3);

    print('Matrix A:');
    print(matrixA.toString());

    print('Matrix B:');
    print(matrixB.toString());

    await delay(1000);

    print('Calculating A x B ...');

    await delay(1000);

    const result = Matrix.multiply(matrixA, matrixB);

    print('Result:');
    print(result.toString());
  };

  await asyncMatrixCalculation();
})();
