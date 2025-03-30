class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static randomize(matrix) {
    matrix.data = matrix.data.map(row => row.map(() => Math.random()));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Columns of A must match rows of B");
    }
    return new Matrix(
      a.data.length,
      b.data[0].length
    ).map((_, i, j) =>
      a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
    );
  }

  map(fn) {
    return new Matrix(this.data.length, this.data[0].length).fromArray(
      this.data.map((row, i) =>
        row.map((val, j) => fn(val, i, j, this.data))
      )
    );
  }

  fromArray(arr) {
    this.data = arr;
    return this;
  }

  print() {
    console.table(this.data);
    return this;
  }
}

 
const a = new Matrix(3, 3);
const b = new Matrix(3, 2);
Matrix.randomize(a);
Matrix.randomize(b);
a.print();
b.print();
Matrix.multiply(a, b).print();
