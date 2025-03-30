class Matrix {
  #data;
  constructor(rows, cols, fill = 0) {
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static #validateDimensions(a, b) {
    if (a.#data.length !== b.#data.length || a.#data[0].length !== b.#data[0].length) {
      throw new Error("Matrices have different dimensions!");
    }
  }

  static add(a, b) {
    this.#validateDimensions(a, b);
    return new Matrix(a.#data.length, a.#data[0].length).map((_, i, j) => a.#data[i][j] + b.#data[i][j]);
  }

  map(fn) {
    return this.#data.map((row, i) => row.map((val, j) => fn(val, i, j)));
  }

  print() {
    print(this.#data.map(row => row.join(' ')).join('\n'));
  }

  async *[Symbol.asyncIterator]() {
    for (const row of this.#data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield row;
    }
  }
}

 
(async () => {
  const matrix1 = new Matrix(2, 2, 1);
  const matrix2 = new Matrix(2, 2, 2);
  const resultMatrix = Matrix.add(matrix1, matrix2);

  print("Resulting Matrix:");
  resultMatrix.print();

  print("\nIterating over rows asynchronously:");
  for await (const row of resultMatrix) {
    print(row);
  }
})();
