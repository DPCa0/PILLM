class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B');
    }
    let result = new Matrix(a.data.length, b.data[0].length);
    result.data = result.data.map((row, i) =>
      row.map((_, j) =>
        a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
      )
    );
    return result;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  async mapAsync(callback) {
    const promises = [...this].map(async (value, index) => {
      const row = Math.floor(index / this.data[0].length);
      const col = index % this.data[0].length;
      return callback(value, row, col, this);
    });
    const results = await Promise.all(promises);
    results.forEach((value, index) => {
      const row = Math.floor(index / this.data[0].length);
      const col = index % this.data[0].length;
      this.data[row][col] = value;
    });
  }

  print() {
    console.table(this.data);
  }
}

 
(async () => {
  let A = new Matrix(2, 3, 1);
  let B = new Matrix(3, 2, 2);
  let C = Matrix.multiply(A, B);

  await C.mapAsync(async (value) => {
    await new Promise((res) => setTimeout(res, 100));
    return value * 2;
  });

  C.print();
})();
