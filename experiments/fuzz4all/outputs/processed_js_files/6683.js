class AsyncMatrix {
  constructor(matrix) {
    this.matrix = matrix;
  }

  static async create(rows, cols) {
    const matrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.random())
    );
    return new AsyncMatrix(matrix);
  }

  async *[Symbol.asyncIterator]() {
    for (let row of this.matrix) {
      yield await new Promise((resolve) =>
        setTimeout(() => resolve(row), Math.random() * 1000)
      );
    }
  }

  async transform(fn) {
    const transformedMatrix = [];
    for await (let row of this) {
      transformedMatrix.push(row.map(fn));
    }
    return new AsyncMatrix(transformedMatrix);
  }

  toString() {
    return this.matrix.map((row) => row.join(", ")).join("\n");
  }
}

(async () => {
  const matrix = await AsyncMatrix.create(3, 3);
  print("Original Matrix:\n", matrix.toString());

  const squaredMatrix = await matrix.transform((x) => x * x);
  print("\nSquared Matrix:\n", squaredMatrix.toString());
})();
