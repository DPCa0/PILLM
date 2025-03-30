class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr);
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  async process(fn) {
    for await (let [i, row] of this.data.entries()) {
      for await (let [j, val] of row.entries()) {
        this.data[i][j] = await fn(val, i, j);
      }
    }
    return this;
  }

  static async createAsync(n, m, initialValue) {
    const generateRow = async (i) => Array(m).fill().map((_, j) => initialValue(i, j));
    const data = await Promise.all(Array(n).fill().map((_, i) => generateRow(i)));
    return new Matrix(data);
  }
}

(async () => {
  const mat = await Matrix.createAsync(3, 3, (i, j) => i + j);
  print('Original Matrix:', Array.from(mat));
  const newMat = await mat.process(async (val) => val * 2);
  print('Processed Matrix:', Array.from(newMat));
})().catch(console.error);
