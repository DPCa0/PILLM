class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static fromArray(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    const matrix = new Matrix(rows, cols);
    matrix.data = arr;
    return matrix;
  }

  map(fn) {
    return Matrix.fromArray(
      this.data.map((row, i) => row.map((val, j) => fn(val, i, j)))
    );
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Incompatible matrices");
    }
    return Matrix.fromArray(
      a.data.map((row, i) =>
        b.data[0].map((_, j) =>
          row.reduce((sum, val, k) => sum + val * b.data[k][j], 0)
        )
      )
    );
  }
}

const randomMatrix = (rows, cols) =>
  Matrix.fromArray(
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
    )
  );

const A = randomMatrix(3, 3);
const B = randomMatrix(3, 3);
print("Matrix A:", A.data);
print("Matrix B:", B.data);

const C = Matrix.multiply(A, B);
print("Matrix C (A * B):", C.data);

const C_squared = C.map((x) => x * x);
print("Matrix C squared:", C_squared.data);
