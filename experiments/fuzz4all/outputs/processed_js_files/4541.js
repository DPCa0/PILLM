class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static from(array) {
    const m = new Matrix(array.length, array[0].length);
    m.data = array;
    return m;
  }

  static identity(size) {
    const id = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      id.data[i][i] = 1;
    }
    return id;
  }

  map(callback) {
    return Matrix.from(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error('Matrix dimensions do not match for multiplication.');
    }
    const result = new Matrix(this.data.length, matrix.data[0].length);
    return result.map((_, i, j) =>
      this.data[i].reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0)
    );
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

(async function() {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  print("Creating a 3x3 Identity Matrix:");
  const identity = Matrix.identity(3);
  print(identity.toString());

  print("\nMultiplying with a new Matrix:");
  const other = Matrix.from([[2, 0, 1], [3, 0, 0], [5, 1, 1]]);
  print(other.toString());

  await delay(1000);
  
  print("\nResult:");
  const result = identity.multiply(other);
  print(result.toString());
})();
