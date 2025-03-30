class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(array) {
    const matrix = new Matrix(array.length, array[0].length);
    matrix.data = array;
    return matrix;
  }

  map(func) {
    return Matrix.fromArray(this.data.map((row, i) => row.map((value, j) => func(value, i, j))));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error("Incompatible matrices");
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) => 
      a.data[i].reduce((sum, _, n) => sum + a.data[i][n] * b.data[n][j], 0)
    );
  }

  static identity(size) {
    return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
  }

  static random(rows, cols) {
    return new Matrix(rows, cols).map(() => Math.random());
  }

  print() {
    console.table(this.data);
  }
}

 
const a = Matrix.random(2, 3);
const b = Matrix.random(3, 2);
const c = Matrix.multiply(a, b);

a.print();
b.print();
c.print();
