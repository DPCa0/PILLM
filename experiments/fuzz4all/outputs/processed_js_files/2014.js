class Matrix {
  #data;

  constructor(rows, cols, fill = 0) {
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  *[Symbol.iterator]() {
    for (const row of this.#data) yield* row;
  }

  async mapAsync(callback) {
    return Promise.all(this.#data.map(async (row, i) => {
      return Promise.all(row.map((value, j) => callback(value, i, j)));
    }));
  }

  toString() {
    return this.#data.map(row => row.join(', ')).join('\n');
  }
}

(async () => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const randomDelayMultiplier = async (value) => {
    await sleep(Math.random() * 100);
    return value * 2;
  };

  const matrix = new Matrix(3, 3, 1);
  print('Initial Matrix:\n', matrix.toString());

  const newMatrixData = await matrix.mapAsync(randomDelayMultiplier);
  const newMatrix = new Matrix(3, 3);
  newMatrixData.forEach((row, i) => {
    row.forEach((value, j) => {
      newMatrix.#data[i][j] = value;   
    });
  });

  print('Transformed Matrix:\n', newMatrix.toString());
})();
