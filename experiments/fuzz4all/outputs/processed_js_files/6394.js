 
class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static randomMatrix(rows, cols, max = 10) {
    return new Matrix(rows, cols).map(() => Math.floor(Math.random() * max));
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((value, j) => fn(value, i, j)));
    return this;
  }

  log() {
    console.table(this.data);
    return this;
  }
}

const asyncOperation = async (duration) => {
  return new Promise((resolve) => setTimeout(() => resolve('Done'), duration));
};

async function executeAsyncOperations() {
  print('Starting async operations');
  const result = await asyncOperation(1000);
  print(result);
}

(async () => {
  const m1 = Matrix.randomMatrix(3, 3, 5).log();
  const m2 = Matrix.randomMatrix(3, 3, 5).log();

  const resultMatrix = new Matrix(3, 3).map((_, i, j) =>
    m1.data[i][j] + m2.data[i][j]
  ).log();

  await executeAsyncOperations();

  print('Computation finished.');
})();
