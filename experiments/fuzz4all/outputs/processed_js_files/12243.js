class Matrix {
  constructor(data) {
    this.data = data;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error("Incompatible matrices");
    return new Matrix(a.data.map(row =>
      b.data[0].map((_, colIndex) =>
        row.reduce((sum, item, rowIndex) => sum + item * b.data[rowIndex][colIndex], 0)
      )
    ));
  }

  static identity(size) {
    return new Matrix([...Array(size)].map((_, i) =>
      [...Array(size)].map((_, j) => (i === j ? 1 : 0))
    ));
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

const asyncOperation = () => new Promise(resolve => setTimeout(resolve, 100, "Async Done"));

(async () => {
  const matrixA = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  const matrixB = Matrix.identity(3);

  print('Matrix A:\n', matrixA.toString());
  print('Matrix B:\n', matrixB.toString());

  const result = Matrix.multiply(matrixA, matrixB);
  print('Multiplication Result:\n', result.toString());

  const asyncResult = await asyncOperation();
  print(asyncResult);

  const dynamicProperty = 'dynamicProp';
  const obj = {
    get [dynamicProperty]() {
      return "I'm dynamic!";
    }
  };
  print(obj.dynamicProp);
})();
