class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random())
    );
  }

  static multiply(m1, m2) {
    if (m1.cols !== m2.rows) throw new Error('Incompatible matrices');
    let result = new Matrix(m1.rows, m2.cols);
    result.data = result.data.map((row, i) =>
      row.map((_, j) =>
        m1.data[i].reduce((sum, elm, k) => sum + elm * m2.data[k][j], 0)
      )
    );
    return result;
  }

  [Symbol.iterator]() {
    let i = 0;
    let j = 0;
    return {
      next: () => {
        if (i < this.rows && j < this.cols) {
          const value = this.data[i][j++];
          if (j === this.cols) {
            j = 0;
            i++;
          }
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }

  async* transposeAsync() {
    for (let j = 0; j < this.cols; j++) {
      yield this.data.map(row => row[j]);
    }
  }
}

 
(async () => {
  const m1 = new Matrix(3, 2);
  const m2 = new Matrix(2, 3);
  
  print('Matrix 1:', m1.data);
  print('Matrix 2:', m2.data);
  
  const result = Matrix.multiply(m1, m2);
  print('Multiplied Result:', result.data);

  print('Iterating over Result:');
  for (const value of result) {
    print(value.toFixed(2));
  }
  
  print('Transposing Matrix 1 asynchronously:');
  for await (const row of m1.transposeAsync()) {
    print(row);
  }
})();
