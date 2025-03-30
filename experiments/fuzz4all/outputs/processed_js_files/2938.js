class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    this.forEach((val, i, j) => arr.push(val));
    return arr;
  }

  static map(matrix, fn) {
    let result = new Matrix(matrix.rows, matrix.cols);
    matrix.forEach((val, i, j) => result.data[i][j] = fn(val, i, j));
    return result;
  }

  map(fn) {
    this.forEach((val, i, j) => this.data[i][j] = fn(val, i, j));
    return this;
  }

  forEach(fn) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        fn(this.data[i][j], i, j);
      }
    }
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      console.error('Columns of A must match rows of B');
      return null;
    }
    return new Matrix(a.rows, b.cols).map((_, i, j) => {
      let sum = 0;
      for (let k = 0; k < a.cols; k++) {
        sum += a.data[i][k] * b.data[k][j];
      }
      return sum;
    });
  }

  static randomize(matrix) {
    return matrix.map(() => Math.random() * 2 - 1);
  }

  print() {
    console.table(this.data);
    return this;
  }
}

(async function main() {
   
  let a = new Matrix(3, 3);
  Matrix.randomize(a).print();

   
  let b = Matrix.map(a, (val) => val * 2);
  b.print();

   
  let delay = (