class Matrix {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  static async fromURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new Matrix(data);
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  transpose() {
    return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
  }

  static get identity() {
    return Matrix.from([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);
  }

  static from(data) {
    return new Matrix(data);
  }
}

(async () => {
  const matrix = await Matrix.fromURL('https://example.com/matrix.json');
  const transposed = matrix.transpose();
  const mapped = transposed.map((val) => val * 2);
  
  for (let value of mapped) {
    print(value);
  }
})();
