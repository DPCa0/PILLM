class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static fromArray(arr) {
    const m = new Matrix(arr.length, arr[0].length);
    m.map((_, i, j) => arr[i][j]);
    return m;
  }

  map(fn) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => fn(value, i, j))
    );
    return this;
  }

  add(m) {
    if (m instanceof Matrix) {
      if (m.data.length !== this.data.length || m.data[0].length !== this.data[0].length) {
        throw new Error("Matrices must have the same dimensions");
      }
      return this.map((value, i, j) => value + m.data[i][j]);
    }
    return this.map(value => value + m);
  }

  multiply(m) {
    if (m instanceof Matrix) {
      if (this.data[0].length !== m.data.length) {
        throw new Error("Columns of A must match rows of B");
      }
      const result = new Matrix(this.data.length, m.data[0].length);
      return result.map((_, i, j) => 
        this.data[i].reduce((sum, elm, k) => sum + elm * m.data[k][j], 0)
      );
    }
    return this.map(value => value * m);
  }

  static random(rows, cols) {
    return new Matrix(rows, cols).map(() => Math.random() * 2 - 1);
  }

  log() {
    console.table(this.data);
    return this;
  }
}

 
const matrixHandler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

const m1 = new Matrix(3, 3, 1).add(Matrix.random(3, 3)).multiply(2);
const m2 = new Matrix(3, 3, 5).multiply(Matrix.fromArray([[2, 0, 1], [1, 3, 0], [0, 5, 2]]));
const proxyM1