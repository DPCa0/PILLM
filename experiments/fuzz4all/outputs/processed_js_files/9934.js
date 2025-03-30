class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr);
  }

  [Symbol.iterator]() {
    let i = 0;
    const data = this.data.flat();
    return {
      next: () => ({
        value: data[i],
        done: i++ >= data.length,
      }),
    };
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  *[Symbol.asyncIterator]() {
    for (const row of this.data) {
      yield new Promise((resolve) => setTimeout(() => resolve(row), 100));
    }
  }
}

(async () => {
  const matrix = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  print('Matrix:');
  for (const val of matrix) {
    process.stdout.write(val + ' ');
  }
  print();

  print('Mapped Matrix:');
  const squaredMatrix = matrix.map((val) => val * val);
  for (const val of squaredMatrix) {
    process.stdout.write(val + ' ');
  }
  print();

  print('Async Iteration Over Rows:');
  for await (const row of matrix) {
    print(row);
  }
})();
