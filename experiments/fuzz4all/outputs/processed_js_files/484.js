class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static fromArray(arr) {
    const m = new Matrix(arr.length, arr[0].length);
    m.data = arr;
    return m;
  }

  map(func) {
    return new Matrix(this.data.length, this.data[0].length).fromArray(
      this.data.map((row, i) => row.map((val, j) => func(val, i, j)))
    );
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Columns of A must match rows of B");
    }
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
    );
  }
}

const a = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6],
]);
const b = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12],
]);

const c = Matrix.multiply(a, b);
print("Resultant Matrix:");
console.table(c.data);

 
async function asyncOperation() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  print("Starting async operation...");
  await delay(1000);
  print("Async operation completed!");
}

asyncOperation();
