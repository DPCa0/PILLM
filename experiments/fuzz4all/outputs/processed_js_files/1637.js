class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => fill)
    );
  }

  static fromArray(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    let matrix = new Matrix(rows, cols);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => 
      row.map((val, j) => fn(val, i, j))
    );
    return this;
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
  
  static multiply(a, b) {
    if (a.cols !== b.rows) {
      throw new Error('Columns of A must match rows of B');
    }
    return new Matrix(a.rows, b.cols).map((_, i, j) => 
      a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
    );
  }
}

const proxyHandler = {
  get(target, prop) {
    if (typeof prop === 'string' && prop.match(/row\d+/)) {
      const rowIndex = parseInt(prop.slice(3)) - 1;
      return target.data[rowIndex];
    }
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    if (typeof prop === 'string' && prop.match(/row\d+/)) {
      const rowIndex = parseInt(prop.slice(3)) - 1;
      if (Array.isArray(value) && value.length === target.cols) {
        target.data[rowIndex] = value;
        return true;
      }
      return false;
    }
    return Reflect.set(...arguments);
  }
};

 
const a = Matrix.fromArray([
  [1, 2],
  [3, 4],
  [5, 6]
]);

const b = Matrix.fromArray([
  [7, 8, 9],
  [10, 11, 12]
]);

const product = Matrix.multiply(a, b);

const proxyMatrix = new Proxy(product, proxyHandler);
proxyMatrix.row1 = [15, 16,