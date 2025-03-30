class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    let result = new Matrix(a.rows, b.cols);
    result.data = result.data.map((row, i) =>
      row.map((_, j) =>
        a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0)
      )
    );
    return result;
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.rows) {
          const value = this.data[row][col];
          col++;
          if (col === this.cols) {
            col = 0;
            row++;
          }
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  *entries() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        yield [i, j, this.data[i][j]];
      }
    }
  }

  log() {
    console.table(this.data);
  }
}

 
const matrixHandler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments:`, args);
        return target[prop].apply(this, args);
      };
    }
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting value ${value} at ${prop}`);
    target[prop] = value;
    return true;
  }
};

const a = new Proxy(new Matrix(2, 3, 1), matrixHandler);
const b = new Proxy(new Matrix(3, 2, 2), matrixHandler);

a.log();
b.log();

const c = Matrix.multiply(a, b);
c.log();

 
for (const value of c) {
  print(value);
}

 
for