class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr);
  }

  get rows() {
    return this.data.length;
  }

  get cols() {
    return this.data[0].length;
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    return {
      next: () => {
        if (row >= this.rows) return { done: true };
        const value = this.data[row][col];
        col++;
        if (col >= this.cols) {
          col = 0;
          row++;
        }
        return { value, done: false };
      },
    };
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
  }

  async *asynchronouslyModifiedGenerator(fn) {
    for (const value of this) {
      yield await fn(value);
    }
  }

  static async processMatrixAsync(matrix, fn) {
    const result = [];
    for await (let modified of matrix.asynchronouslyModifiedGenerator(fn)) {
      result.push(modified);
    }
    return result;
  }
}

 
(async () => {
  const matrix = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  const result = await Matrix.processMatrixAsync(matrix, async (value) => {
    return value * 2;
  });

  print(result);
})();
