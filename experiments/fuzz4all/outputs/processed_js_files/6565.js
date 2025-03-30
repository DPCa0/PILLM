class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static fromArray(arr) {
    let matrix = new Matrix(arr.length, arr[0].length);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  map(callback) {
    this.data = this.data.map((row, i) =>
      row.map((val, j) => callback(val, i, j))
    );
    return this;
  }

  multiply(other) {
    if (other instanceof Matrix) {
      if (this.cols !== other.rows)
        throw new Error("Columns of A must match rows of B");
      let result = new Matrix(this.rows, other.cols);
      return result.map((_, i, j) =>
        this.data[i].reduce(
          (sum, elem, k) => sum + elem * other.data[k][j],
          0
        )
      );
    } else {
      return this.map(val => val * other);
    }
  }

  static random(rows, cols) {
    let matrix = new Matrix(rows, cols);
    return matrix.map(() => Math.random() * 2 - 1);
  }

  print() {
    console.table(this.data);
  }
}

const m1 = Matrix.random(3, 2);
const m2 = Matrix.random(2, 3);

const result = m1.multiply(m2);
result.print();
