class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static fromArray(array) {
    const rows = array.length;
    const cols = array[0].length;
    const matrix = new Matrix(rows, cols);
    matrix.data = array;
    return matrix;
  }

  map(callback) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => callback(value, i, j))
    );
    return this;
  }

  static multiply(A, B) {
    if (A.data[0].length !== B.data.length) {
      throw new Error('Columns of A must match rows of B.');
    }
    const result = new Matrix(A.data.length, B.data[0].length);
    result.map((_, i, j) => {
      let sum = 0;
      for (let k = 0; k < A.data[0].length; k++) {
        sum += A.data[i][k] * B.data[k][j];
      }
      return sum;
    });
    return result;
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

 
const A = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);
const B = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const C = new Proxy(Matrix.multiply(A, B), handler);
print('Resulting Matrix:\n' + C.toString());
