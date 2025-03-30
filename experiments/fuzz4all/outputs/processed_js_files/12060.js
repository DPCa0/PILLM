class Matrix {
  #data;

  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(array) {
    let matrix = new Matrix(array.length, array[0].length);
    matrix.map((_, i, j) => array[i][j]);
    return matrix;
  }

  map(callback) {
    this.#data = this.#data.map((row, i) =>
      row.map((value, j) => callback(value, i, j))
    );
    return this;
  }

  multiply(other) {
    if (this.cols !== other.rows) throw new Error("Incompatible dimensions");
    return new Matrix(this.rows, other.cols).map(
      (_, i, j) => 
        this.#data[i].reduce((sum, _, k) => sum + this.#data[i][k] * other.#data[k][j], 0)
    );
  }

  [Symbol.iterator]() {
    let i = 0, j = 0;
    return {
      next: () => {
        if (i < this.rows) {
          let value = { value: this.#data[i][j], done: false };
          j++;
          if (j >= this.cols) {
            j = 0;
            i++;
          }
          return value;
        } else {
          return { done: true };
        }
      }
    };
  }

  toString() {
    return this.#data.map(row => row.join('\t')).join('\n');
  }
}

(async () => {
  const a = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  const b = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
  ]);

  const result = a.multiply(b);
  
  for (const value of result) {
    print(value);
  }

  print('Resulting Matrix:\n', result.toString());
})();
