 
class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    let rows = arr.length;
    let cols = arr[0].length;
    let m = new Matrix(rows, cols);
    m.data = arr;
    return m;
  }

  map(fn) {
    return this.data.map((row, i) =>
      row.map((val, j) => fn(val, i, j))
    );
  }

  print() {
    console.table(this.data);
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) {
      throw new Error("Columns of A must match rows of B");
    }
    let result = new Matrix(a.rows, b.cols);
    result.data = result.map((_, i, j) =>
      a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
    );
    return result;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncOperation() {
  print('Begin Async Operation...');
  await delay(1000);
  print('Operation Completed!');
}

(async () => {
  let a = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

  let b = Matrix.fromArray([
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1]
  ]);

  try {
    print('Matrix A:');
    a.print();
    print('Matrix B:');
    b.print();

    let c = Matrix.multiply(a, b);
    print('A * B Result:');
    c.print();
  } catch (error) {
    console.error(error);
  }

  await asyncOperation();
})();
