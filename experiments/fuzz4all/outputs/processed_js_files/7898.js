class Matrix {
  constructor(rows, cols, filler = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => filler)
    );
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, arr[0].length);
    m.data = arr.map(row => [...row]);
    return m;
  }

  static identity(size) {
    let m = new Matrix(size, size);
    m.data = m.data.map((row, i) =>
      row.map((_, j) => (i === j ? 1 : 0))
    );
    return m;
  }

  multiply(matrix) {
    if (matrix instanceof Matrix) {
      if (this.cols !== matrix.rows) {
        throw new Error('Columns of A must match rows of B.');
      }
      let result = new Matrix(this.rows, matrix.cols);
      result.data = result.data.map((row, i) =>
        row.map(
          (_, j) =>
            this.data[i].reduce(
              (sum, elm, k) => sum + elm * matrix.data[k][j],
              0
            )
        )
      );
      return result;
    } else {
      throw new Error('The argument must be a Matrix.');
    }
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property "${prop}"`);
    return target[prop];
  },
};

const identityMatrix = new Proxy(Matrix.identity(3), handler);
const anotherMatrix = new Proxy(
  Matrix.fromArray([
    [2, 3, 4],
    [1, 0, 0],
    [0, 1, 1],
  ]),
  handler
);

print('Identity Matrix:');
print(identityMatrix.toString());
print('\nAnother Matrix:');
print(anotherMatrix.toString());
print('\nMultiplication Result:');
const resultMatrix = new Proxy(identityMatrix.multiply(anotherMatrix), handler);
print(resultMatrix.toString());
