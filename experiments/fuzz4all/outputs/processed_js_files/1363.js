class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(array) {
    let m = new Matrix(array.length, array[0].length);
    m.data = array.map(row => [...row]);
    return m;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static add(a, b) {
    return Matrix.fromArray(
      a.data.map((row, i) => row.map((val, j) => val + b.data[i][j]))
    );
  }

  multiply(b) {
    if (typeof b === 'number') {
      return this.map(val => val * b);
    } else {
      return Matrix.fromArray(
        this.data.map((row, i) => 
          b.data[0].map((_, j) => 
            row.reduce((sum, val, k) => sum + val * b.data[k][j], 0)
          )
        )
      );
    }
  }

  log() {
    console.table(this.data);
  }
}

 
(async function demo() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  let A = new Matrix(2, 2, 1);
  let B = Matrix.fromArray([[2, 3], [4, 5]]);

  print("Initial Matrices:");
  A.log();
  B.log();

  print("After Addition:");
  let C = Matrix.add(A, B);
  C.log();

  print("After Multiplication with a constant:");
  let D = A.multiply(3);
  D.log();

  print("After Matrix Multiplication:");
  let E = A.multiply(B);
  E.log();

  print("Demonstrating asynchronous operation with delay:");
  for (let i = 1; i <= 3; i++) {
    await delay(1000);
    print(`Delay iteration: ${i}`);
  }
})();
