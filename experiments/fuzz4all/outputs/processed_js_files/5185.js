class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
  }

  static from(array) {
    let m = new Matrix(array.length, array[0].length);
    m.data = array;
    return m;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  map(func) {
    return Matrix.from(this.data.map((row, i) => row.map((val, j) => func(val, i, j))));
  }

  multiply(other) {
    if (this.data[0].length !== other.data.length) throw new Error('Matrix dimensions mismatch');
    return this.map((_, i, j) => this.data[i].reduce((acc, val, k) => acc + val * other.data[k][j], 0));
  }

  static identity(size) {
    return Matrix.from(Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => i === j ? 1 : 0)));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const asyncDouble = async (matrix) => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(100);
  return matrix.map(value => value * 2);
};

(async () => {
  const a = new Matrix(2, 3);
  a.data = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  const b = Matrix.identity(3);

  print('Matrix A:\n' + a);
  print('\nIdentity Matrix B:\n' + b);

  const c = a.multiply(b);
  print('\nMatrix C (A * B):\n' + c);

  const d = await asyncDouble(c);
  print('\nMatrix D (C * 2):\n' + d);
})();
