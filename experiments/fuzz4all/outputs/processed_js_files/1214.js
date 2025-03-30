class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  map(callback) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => callback(value, i, j))
    );
    return this;
  }

  multiply(other) {
    if (this.cols !== other.rows) {
      throw new Error("Columns of A must match rows of B.");
    }
    let result = new Matrix(this.rows, other.cols);
    result.map((_, i, j) =>
      this.data[i].reduce((sum, elem, k) => sum + elem * other.data[k][j], 0)
    );
    return result;
  }

  log() {
    console.table(this.data);
  }
}

const asyncFetch = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

(async () => {
  try {
    const matrix1 = new Matrix(2, 3).map((_, i, j) => i * 2 + j);
    const matrix2 = new Matrix(3, 2).map((_, i, j) => i + j * 2);

    const product = matrix1.multiply(matrix2);
    product.log();

    const data = await asyncFetch('https://api.chucknorris.io/jokes/random');
    print(`Random Joke: ${data.value}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
