class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static from(array) {
    if (!Array.isArray(array) || !Array.isArray(array[0])) {
      throw new Error("Input must be a 2D array");
    }
    const m = new Matrix(array.length, array[0].length);
    m.data = array.map(row => [...row]);
    return m;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  map(callback) {
    return this.data.map((row, i) =>
      row.map((val, j) => callback(val, i, j, this))
    );
  }

  async forEachAsync(callback) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        await callback(this.data[i][j], i, j, this);
      }
    }
  }

  transpose() {
    const transposedData = Array.from({ length: this.cols }, (_, i) =>
      this.data.map(row => row[i])
    );
    return Matrix.from(transposedData);
  }
}

(async () => {
  const m1 = Matrix.from([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  print("Original Matrix:");
  print(m1.data);

  const m2 = m1.transpose();
  print("Transposed Matrix:");
  print(m2.data);

  print("Iterating over the matrix:");
  for (let value of m1) {
    print(value);
  }

  print("Mapping values:");
  const incrementedMatrix = m1.map(x => x + 1);
  print(incrementedMatrix);

  print("Async operation over the matrix:");
  await m1.forEachAsync(async (val, i, j) => {
    await new Promise(r => setTimeout(r, 100));
    print(`Value at [${i},${j}]:`, val);
  });
})();
